import datetime
import re
from secrets import token_urlsafe

from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Manager, Q, Count
from django.urls import reverse
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.utils.functional import cached_property
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _, gettext
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify
from model_utils.models import TimeStampedModel

# Create your models here.
from solo.models import SingletonModel

from house_of_refuge.main.utils import ago, get_phone_number_display, extract_number_from_string

User = get_user_model()


class HousingType(models.TextChoices):
    HOUSE = "house", _("House")
    FLAT = "flat", _("Apartment")
    ROOM = "room", _("Room")
    SOFA = "sofa", _("Sofa")


# class TransportRange(models.TextChoices):
#     WARSAW = "warsaw", _("Warsaw")
#     POLAND = "poland", _("Poland")
#     NONE = "none", _("None")


class Status(models.TextChoices):
    NEW = "new", _("Fresh")
    TAKEN = "taken", _("Taken")
    CALLING = "calling", _("Calling")
    IGNORE = "ignore", _("Ignore")
    SHOULD_DELETE = "should_delete", _("For deletion")


class HousingResourceManager(Manager):

    def for_remote(self, user):
        return self.filter(
            Q(status__in=[Status.NEW])
            # | Q(owner=user)
        )

    def exclude_excels(self):
        cutoff = datetime.datetime(2022, 3, 3, 16, 0, 0)
        return self.exclude(Q(created__lt=cutoff), ~Q(people_to_accommodate_raw=""))


# dodać do formularza zasobowego:
# - osobno: ile masz lat
# - osobno: czy masz/przyjmiesz zwierzęta
# - języki: osobno
# - kiedy można do ciebie dzwonić/czy można dzwonić do ciebie po północy
# -

def generate_token():
    for i in range(1000):
        token = get_random_string(32)
        if not HousingResource.objects.filter(token=token).exists():
            return token
    raise ValueError


class HousingResource(TimeStampedModel):
    name = models.CharField(
        max_length=512,
        null=False,
        verbose_name=_("Full name"),
    )
    description = models.TextField(
        max_length=2048,
        default="",
        blank=True,
        verbose_name=_("Something about accommodation"),
        help_text=_("who do you live with (if you'll host at your place)?, some rules about place? "),
    )
    # resource = models.CharField(
    #     choices=HousingType.choices,
    #     max_length=1024,
    #     verbose_name=_("Resource"),
    # )
    house = models.BooleanField(
        default=False,
        verbose_name=_("House"),
    )
    flat = models.BooleanField(
        default=False,
        verbose_name=_("Flat"),
    )
    room = models.BooleanField(
        default=False,
        verbose_name=_("Room"),
    )
    sofa = models.BooleanField(
        default=False,
        verbose_name=_("Room"),
    )
    city = models.CharField(
        max_length=30,
        default='',
        null=False,
        blank=False,
        verbose_name=_("City and zip code"),
    )
    country = models.CharField(
        max_length=30,
        null=True,
        verbose_name=_("Country"),
    )
    postal_code = models.CharField(
        max_length=8,
        verbose_name=_("Zip code"),
    )
    address = models.CharField(
        max_length=512,
        verbose_name=_("Address"),
        help_text=_("street, building number, appartment number"),
    )
    people_desc = models.CharField(
        max_length=1024,
        blank=True,
        default="",
        verbose_name=_("Max number of people to accomodate"),
        help_text=_("How many people can you support while providing them adequate living conditions?"),
    )
    how_many_people = models.IntegerField(
        default=0,
        verbose_name=_("Max number of people to accomodate"),
        help_text=_("How many people can you support while providing them adequate living conditions?"),
    )
    phone_when = models.CharField(
        max_length=1024,
        default="",
        blank=True,
        verbose_name=_("When to call?"),
    )
    costs = models.CharField(
        max_length=1024,
        verbose_name=_("Costs"),
        help_text=_("Costs of stay - rent, fees, rental costs or free stay"),
    )
    date = models.DateField(
        default=timezone.now,
        verbose_name=_("Availability"),
        help_text=_("When can you start providing the accommodation?"),
    )
    how_long = models.CharField(
        max_length=1024,
        verbose_name=_("Accommodation length"),
        help_text=_("For how long can you provide the accomodation?"),
    )
    details = models.TextField(
        max_length=2048,
        default="",
        blank=True,
        verbose_name=_("Details"),
        help_text=_("A bunch of information about the place - presence of animals, languages spoken by tenants, availability of bed linen and towels, others"),
    )
    phone = models.CharField(
        max_length=128,
        null=False,
        verbose_name=_("Phone number"),
    )
    food = models.BooleanField(
        default=False,
        verbose_name=_("Do you provide food?"),
    )
    pets = models.BooleanField(
        default=False,
        verbose_name=_("Do you live with pets?"),
    )
    can_live_with_pets = models.BooleanField(
        default=False,
        verbose_name=_("Can you live with pets?"),
    )
    disable = models.BooleanField(
        default=False,
        verbose_name=_("Facilities for the disabled"),
    )
    transport = models.BooleanField(
        default=False,
        verbose_name=_("Do you offer transport"),
    )
    transport_desc = models.TextField(
        max_length=2048,
        default="",
        blank=True,
        verbose_name=_("Transport"),
    )
    job = models.BooleanField(
        default=False,
        verbose_name=_("Do you offer a job"),
    )
    job_descr = models.CharField(
        max_length=1024,
        default="",
        blank=True,
        verbose_name=_("Transport"),
    )
    extra = models.CharField(
        max_length=2048,
        null=True,
        default="",
        blank=True,
        verbose_name=_("Extra details"),
    )
    status = models.CharField(
        choices=Status.choices,
        default=Status.NEW,
        max_length=32,
        verbose_name=_("Status"),
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        default=None,
        null=True,
        blank=True,
        verbose_name=_("Owner"),
    )
    cherry = models.BooleanField(
        default=False,
        verbose_name=_("Cherry"),
    )
    verified = models.BooleanField(
        default=False,
        verbose_name=_("Verified"),
    )
    is_dropped = models.BooleanField(
        default=False,
        verbose_name=_("Is dropped"),
    )
    got_hot = models.DateTimeField(
        default=None,
        null=True,
        blank=True,
        verbose_name=_("Got hot"),
    )
    turtle = models.BooleanField(
        default=False,
        help_text=_("This host offers longer stay"),
        verbose_name=_("Turtle"),
    )
    token = models.CharField(
        max_length=64,
        unique=True,
        default=generate_token,
        verbose_name=_("Token"),
    )

    objects = HousingResourceManager()

    def __str__(self):
        return f"{self.id} {self.name} {self.phone_number} {self.full_address} {self.pk}"

    class Meta:
        verbose_name = _("Resource")
        verbose_name_plural = _("Resources")
        indexes = [
            models.Index(fields=['modified']),
        ]

    def get_edit_url(self):
        return f'{settings.BASE_URL}{reverse("main:host-edit")}?t={self.token}'

    def get_display_in_email(self, i=0):
        link = self.get_edit_url()
        if i:
            return f'{i}. {link} (dodane {self.created.strftime("%Y-%m-%d %H:%M:%S")}'
        return link

    @property
    def full_address(self):
        return f"{self.address} {self.city} {self.country} {self.postal_code}"

    @property
    def is_actively_ready(self):
        return self.got_hot and self.got_hot > ago(hours=12)

    @property
    def hot_sort(self):
        points = [0]
        if self.is_dropped:
            points.append(14)
        if self.is_actively_ready:
            points.append(8)
        if self.cherry:
            points.append(3)
        if self.verified:
            points.append(2)
        return sum(points)

    @property
    def compact_display(self):
        return f"{self.name} {self.get_resource_display()}, {self.full_address}\n{self.extra}"

    def for_stats(self):
        return dict(
            created=self.created,
            status=self.status,
            people_count=self.how_many_people,
            day=get_our_today_cutoff(self.created),
        )

    def for_edit(self):
        return dict(
            id=self.id,
            token=self.token,
            name=self.name,
            #resource=self.resource,
            house=self.house,
            flat=self.flat,
            room=self.room,
            sofa=self.sofa,
            postal_code=self.postal_code,
            city=self.city,
            address=self.address,
            people_to_accommodate=self.how_many_people,
            when_to_call=self.phone_when,
            costs=self.costs,
            availability=self.date,
            accommodation_length=extract_number_from_string(
                self.how_long, default=0) or self.how_long,
            details=self.details,
            transport=self.transport_desc,
            living_with_pets=self.pets,
            can_take_person_with_pets=self.can_live_with_pets,
            phone_number=get_phone_number_display(self.phone),
            extra=self.extra or "",
        )

    def sub_representation(self):
        return dict(
            name=self.name,
            address=self.full_address,
            phone_number=get_phone_number_display(self.phone),
            will_pick_up_now=self.transport,
            owner=self.owner.as_json() if self.owner else None,
        )

    def as_prop(self):
        return dict(
            id=self.id,
            name=self.name,
            #resource=self.resource,
            house=self.house,
            flat=self.flat,
            room=self.room,
            sofa=self.sofa,
            postal_code=self.postal_code,
            city=self.city,
            address=self.address,
            full_address=self.full_address,
            people_to_accommodate=self.how_many_people,
            costs=self.costs,
            availability=self.date,
            accommodation_length=self.how_long,
            details=self.details,
            transport=self.transport_desc,
            phone_number=get_phone_number_display(self.phone),
            will_pick_up_now=self.transport,
            extra=self.extra,
            status=self.status,
            cherry=self.cherry,
            turtle=self.turtle,
            verified=self.verified,
            when_to_call=self.phone_when,
            living_with_pets=self.pets,
            can_take_person_with_pets=self.can_live_with_pets,
            is_dropped=self.is_dropped,
            is_ready=self.is_actively_ready,
            is_hot=self.is_dropped or self.is_actively_ready,
            hot_sort=self.hot_sort,
            compact_display=self.compact_display,
            owner=self.owner.as_json() if self.owner else None,
        )


class SubSource(models.TextChoices):
    WEBFORM = "webform", _("Site")
    MAIL = "mail", _("Email")
    TERRAIN = "terrain", _("Terrain")
    OTHER = "other", _("Other")


class SubStatus(models.TextChoices):
    NEW = "new", _("Fresh")
    SEARCHING = "searching", _("Searching")
    IN_PROGRESS = "in_progress", _("Host found")
    GONE = "gone", _("Gone")
    SUCCESS = "success", _("Success")
    CANCELLED = "cancelled", _("Cancelled")


END_OF_DAY = 5


def get_our_today_cutoff(date=None):
    now = date or timezone.now()
    base_time = now.astimezone(timezone.get_default_timezone())
    if base_time.hour > END_OF_DAY:
        cut_off = base_time.date()
    else:
        cut_off = (base_time - datetime.timedelta(days=1)).date()
    return cut_off


class SubmissionManager(Manager):

    def for_remote(self):
        return self.filter(
            Q(status__in=[Status.NEW])
        )

    def active_today(self):
        return self.filter(when__lte=get_our_today_cutoff())

    def for_happy_message(self):
        now = timezone.now()
        if now.hour > END_OF_DAY:
            cut_off = now.replace(hour=END_OF_DAY, minute=0, second=0)
        else:
            cut_off = now.replace(day=now.day - 1, hour=END_OF_DAY, minute=0, second=0)
        return self.filter(finished_at__gte=cut_off, status=SubStatus.SUCCESS).only("people")


class Submission(TimeStampedModel):
    name = models.CharField(
        max_length=512,
        null=False,
        verbose_name=_("Full name"),
    )
    phone_number = models.CharField(
        max_length=128,
        verbose_name=_("Phone number"),
    )
    people = models.CharField(
        max_length=128,
        verbose_name=_("The number of people"),
    )
    how_long = models.CharField(
        max_length=128,
        verbose_name=_("Length of stay"),
        help_text=_("For how long (in days)?"),
    )
    description = models.CharField(
        max_length=2048,
        verbose_name=_("Description"),
        help_text=_("Describe the group, age of every person, "
            "their relationships (family, friends?), "
            "indicate whether it can be broken into smaller groups"),
        )
    origin = models.CharField(
        max_length=512,
        blank=True,
        default="",
        verbose_name=_("Nationality"),
    )
    traveling_with_pets = models.CharField(
        max_length=1024,
        null=True,
        blank=True,
        verbose_name=_("Traveling with pets"),
    )
    can_stay_with_pets = models.CharField(
        max_length=512,
        null=True,
        blank=True,
        verbose_name=_("Can stay with pets"),
        help_text=_("Can the person stay with pets (e.g., due to allergies)?"),
    )  # does this need a dropdown on the frontend?
    contact_person = models.CharField(
        max_length=1024,
        null=True,
        blank=True,
        verbose_name=_("Contact person"),
    )
    languages = models.CharField(
        max_length=1024,
        null=True,
        blank=True,
        verbose_name=_("Languages"),
        help_text=_("Languages that the person speaks"),
    )
    when = models.DateField(
        default=timezone.now,
        null=True,
        blank=True,
        verbose_name=_("Since when the support is needed"),
    )
    transport_needed = models.BooleanField(
        default=True,
        verbose_name=_("Transport needed"),
    )
    # following fields are for logged in users
    note = models.CharField(
        max_length=2048,
        default="",
        blank=True,
        verbose_name=_("Note"),
    )
    status = models.CharField(
        choices=SubStatus.choices,
        default=Status.NEW,
        max_length=32,
        verbose_name=_("Status"),
    )
    person_in_charge_old = models.CharField(
        max_length=512,
        default="",
        blank=True,
        verbose_name=_("Person in charge (legacy)"),
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        default=None,
        blank=True,
        null=True,
        related_name="received_subs",
        verbose_name=_("Receiver of the submission"),
    )
    coordinator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        default=None,
        blank=True,
        null=True,
        related_name="coord_subs",
        verbose_name=_("Coordinator"),
    )
    matcher = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        default=None,
        blank=True,
        null=True,
        related_name="matched_subs",
        verbose_name=_("Who found the host"),
    )
    resource = models.ForeignKey(
        HousingResource,
        on_delete=models.SET_NULL,
        default=None,
        blank=True,
        null=True,
        verbose_name=_("Resource (Host)"),
        )
    priority = models.IntegerField(
        default=1,
        verbose_name=_("Priority"),
    )
    source = models.CharField(
        choices=SubSource.choices,
        default=SubSource.WEBFORM,
        max_length=64,
        verbose_name=_("Source"),
    )
    should_be_deleted = models.BooleanField(
        default=False,
        verbose_name=_("Should be deleted"),
    )
    finished_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name=_("Finished at"),
    )

    # TODO: add last status update?

    objects = SubmissionManager()

    def __str__(self):
        return f"{self.id} {self.name} {self.people} na {self.how_long}"

    class Meta:
        verbose_name = _("Submission")
        verbose_name_plural = _("Submissions")
        ordering = ['-priority', 'created']
        indexes = [
            models.Index(fields=['modified']),
        ]

    def save(self, *args, **kwargs):
        if self.accomodation_in_the_future:
            self.priority = -1
        elif self.status == SubStatus.NEW:
            self.priority = 0
            if self.resource:
                self.clear_resource()
                self.resource = None
        elif self.status == SubStatus.SEARCHING:
            self.priority = 1
        elif self.status == SubStatus.IN_PROGRESS:
            self.priority = 2
            if getattr(self.resource, "will_pick_up_now", False):
                self.priority = 3
        elif self.status == SubStatus.CANCELLED:
            self.priority = -3
        elif self.status == SubStatus.SUCCESS:
            self.priority = -2
        if self.status == SubStatus.SUCCESS and not self.finished_at:
            self.finished_at = timezone.now()
        return super(Submission, self).save(*args, **kwargs)

    @property
    def people_as_int(self):
        return extract_number_from_string(self.people, default=1)

    @property
    def accomodation_in_the_future(self):
        if self.when:
            when = self.when.date() if isinstance(self.when, datetime.datetime) else self.when
            return when > get_our_today_cutoff()
        return False

    def clear_resource(self):
        self.resource.owner = None
        self.resource.availability = get_our_today_cutoff()
        self.resource.save()

    @cached_property
    def first_searched_date(self):
        try:
            return self.changes.filter(
                change__icontains="status': 'searching'"
            ).earliest("created").created.astimezone(
                timezone.get_default_timezone()
            )
        except ObjectChange.DoesNotExist:
            return None

    @cached_property
    def first_matched_date(self):
        try:
            return self.changes.filter(
                change__icontains="matched host"
            ).earliest("created").created.astimezone(
                timezone.get_default_timezone()
            )
        except ObjectChange.DoesNotExist:
            return None

    def for_stats(self):
        first_searched = self.first_searched_date
        first_match = self.first_matched_date
        return dict(
            id=self.id,
            created=self.created.astimezone(timezone.get_default_timezone()),
            created_hour=self.created.astimezone(timezone.get_default_timezone()).hour,
            status=self.status,
            finished_at=self.finished_at,
            finished_day=get_our_today_cutoff(self.finished_at) if self.finished_at else None,
            source=self.source,
            people_count=self.people_as_int,
            day=get_our_today_cutoff(self.created.astimezone(timezone.get_default_timezone())),
            first_searched=first_searched,
            first_searched_hour=first_searched.hour if first_searched else None,
            first_match=first_match,
            first_match_hour=first_match.hour if first_match else None
        )

    def handle_gone(self):
        self.status = SubStatus.CANCELLED
        if self.resource:
            self.resource.is_dropped = True
            self.resource.note += format(
                "\n{}: {}; {}: {}",
                gettext("Dropped from submission"),
                self.id,
                gettext("Host found by"),
                self.resource.owner,
            )
            self.clear_resource()
            self.resource = None
        self.note += format(
            "\n{}: {}",
            gettext("Dropped at"),
            timezone.now().strftime("%Y-%m-%d %H:%M:%S"),
        )
        self.save()

    def as_prop(self):
        try:
            created = self.created.astimezone(timezone.get_default_timezone()).strftime("%-d %B %H:%M:%S")
        except ValueError:
            created = str(self.created.astimezone(timezone.get_default_timezone()))
        return dict(
            id=self.id,
            created=created,
            name=self.name,
            phone_number=get_phone_number_display(self.phone_number),
            people=self.people,
            people_count=str(self.people_as_int),
            description=self.description,
            how_long=self.how_long,
            languages=self.languages,
            source=self.source,
            priority=self.priority,
            when=self.when,
            contact_person=self.contact_person,
            transport_needed=self.transport_needed,
            receiver=self.receiver.as_json() if self.receiver else None,
            coordinator=self.coordinator.as_json() if self.coordinator else None,
            matcher=self.matcher.as_json() if self.matcher else None,
            note=self.note,
            accomodation_in_the_future=self.accomodation_in_the_future,
            status=self.status,
            origin=self.origin,
            is_today=get_our_today_cutoff(self.created) >= get_our_today_cutoff(),
            traveling_with_pets=self.traveling_with_pets,
            can_stay_with_pets=self.can_stay_with_pets,
            resource=self.resource.sub_representation() if self.resource else None,
        )


class Groups(models.TextChoices):
    REMOTE = "remote", _("Remote")
    STATION = "station", _("Station")


class Coordinator(TimeStampedModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    group = models.CharField(
        choices=Groups.choices,
        max_length=32,
        verbose_name=_("Group"),
    )

    class Meta:
        verbose_name = _("Coordinator")
        verbose_name_plural = _("Coordinators")

    def as_json(self):
        return dict(user=self.user.as_json(), group=self.group)


class ObjectChange(TimeStampedModel):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("User"),
    )
    submission = models.ForeignKey(
        Submission,
        on_delete=models.SET_NULL,
        null=True,
        related_name="changes",
        verbose_name=_("Submission"),
    )
    host = models.ForeignKey(
        HousingResource,
        on_delete=models.SET_NULL,
        null=True,
        related_name="changes",
        verbose_name=_("Host"),
    )
    change = models.CharField(
        max_length=2048,
        verbose_name=_("Change"),
    )

    def __str__(self):
        return f"{self.user}: {self.change}" \
               f" (sub={getattr(self.submission, 'id', None)})" \
               f" (host={getattr(self.host, 'id', None)})"

    class Meta:
        verbose_name = _("Record Change")
        verbose_name_plural = _("Record Changes")


class SiteConfiguration(SingletonModel):
    submission_throttling = models.IntegerField(
        default=30, verbose_name=_("submission throttling"),
        help_text=_("Max number of open/searching submissions. Set to 0 to disable throttling.")
    )
    throttle_created_after = models.DateTimeField(
        default=timezone.now, verbose_name=_("submission throttling active since"),
        help_text=_("Only submissions created after this date will be "
                    "counted in calculating throttling limit"))

    def __str__(self):
        return gettext("Site Configuration")

    class Meta:
        verbose_name = _("Site Configuration")


MARKDOWN_FIELD_HELP_TEXT = mark_safe(
    _("You can use <a href='https://docs.github.com/en/"
      "get-started/writing-on-github/getting-started-with"
      "-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'"
      " target='_blank'>Markdown</a> here.")
)


class MenuPage(TimeStampedModel):
    slug = models.SlugField(
        max_length=128,
        unique=True,
        verbose_name=_("Identifier"),
    )
    menu_title_primary_language = models.CharField(
        max_length=512,
        verbose_name=_("Title in the primary language"),
    )
    menu_title_secondary_language = models.CharField(
        max_length=512,
        blank=False,
        verbose_name=_("Title in the secondary language"),
    )
    content_primary_language = MarkdownxField(
        help_text=MARKDOWN_FIELD_HELP_TEXT,
        verbose_name=_("Content in the primary language"),
    )
    content_secondary_language = MarkdownxField(
        help_text=MARKDOWN_FIELD_HELP_TEXT,
        blank=True,
        default="",
        verbose_name=_("Content in the secondary language"),
    )
    published = models.BooleanField(
        default=False,
        verbose_name=_("Published"),
    )

    def __str__(self):
        return f"{self.menu_title_primary_language} ({self.slug})"

    def as_json(self):
        return {
            "slug": self.slug,
            "menu_title_primary_language": self.menu_title_primary_language,
            "menu_title_secondary_language": self.menu_title_secondary_language,
            "content_primary_language": markdownify(self.content_primary_language),
            "content_secondary_language": markdownify(self.content_secondary_language),
        }

    class Meta:
        verbose_name = _("Menu Page")
        verbose_name_plural = _("Menu Pages")
