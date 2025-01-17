import React, {useEffect, useState} from "react";
import {Button, Dropdown, Table} from "react-bootstrap";
import {getCookie, getPickUpDisplay, SUB_STATE_OPTIONS} from "../scripts/utils";
import Select from "react-dropdown-select";
import {EditableField} from "./Shared";
import {toast} from "react-toastify";

const getStatusDisplay = (status) => {
  const option = SUB_STATE_OPTIONS.filter(o => o.value === status)[0];
  return option.label;
};

const statusAsNumber = (value) => {
  switch (value) {
    case "new":
      return 0;
    case "searching":
      return 1;
    case "in_progress":
      return 2;
    case "cancelled":
      return 3;
    case "success":
      return 4;
    default:
      return 10;
  }
};


const updateSub = (sub, fields, onCorrect = null) => {

  fetch(`/api/sub/update/${sub.id}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')
    }, body: JSON.stringify({fields: fields}) // body data type must match "Content-Type" header
  }).then(response => response.json()).then(data => {

    if (data.status === "success") {
      if (onCorrect) {

        onCorrect();
      }
    }
    // toast(`${data.message}`, {type: data.status});
  }).catch((error) => {
    console.error('Error:', error);
    toast(`THERE WAS AN ERROR:\n${error}`, {type: "error", autoClose: 3000});
  });
};


export function SubmissionRow({sub, activeHandler, user, isGroupCoordinator, isActive = false, readOnly = false}) {


  const isGroupAdmin = isGroupCoordinator;
  const isOwner = user.id === sub.matcher?.id;
  const isCoordinator = user.id === sub.coordinator?.id;
  const [status, setStatus] = useState(sub.status);
  const [note, setNote] = useState(sub.note);
  const [localSub, setLocalSub] = useState(sub);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setLocalSub(sub);
    setNote(sub.note);
    setStatus(sub.status);
  }, [sub]);

  const btnHandler = () => {
    if (readOnly) {
      return;
    }

    activeHandler(sub, isActive);
  };



  const getActionBtn = () => {
    if (readOnly || isActive || statusAsNumber(localSub.status) > 2) {
      return "";
    }
    if (localSub.status === "in_progress") {
      if (localSub.coordinator) {
        return "";
      } else {
        return <Button size={"sm"} onClick={setCoordinator}>Przypisz do siebie</Button>;
      }
    } else if (localSub.status === "searching" && !isOwner) {
      return "";
    } else if (localSub.matcher && !isActive && !isOwner) {
      return <Button size={"sm"} disabled>{localSub.matcher.display}</Button>;
    } else if (localSub.status === "cancelled") {
      return "NIEAKTUALNE";
    } else {
      return <Button className={"w-100"} size={"sm"} onClick={btnHandler}>{isActive ? "Zwolnij" : "Szukaj Hosta"}</Button>;
    }
  };

  const updateStatus = (value) => {

    const newStatus = value[0].value;
    if (newStatus !== localSub.status) {
      updateSub(localSub, {"status": newStatus}, () => setStatus(newStatus));
      setLocalSub((s) => ({...s, status: newStatus}));
    } else {

    }
  };

  const freeUpMatcher = () => {
    updateSub(sub, {"matcher": null, "status": "new"}, () => {
      setStatus("new");
      setLocalSub((s) => ({...s, matcher: null}));
    });
  };

  const freeUpCoord = () => {
    updateSub(sub, {"coordinator": null}, () => {
      setLocalSub((s) => ({...s, coordinator: null}));
    });
  };


  const setCoordinator = () => {

    fetch(`/api/sub/update/${localSub.id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')
      }, body: JSON.stringify({fields: {"coordinator_id": user.id}}) // body data type must match "Content-Type" header
    }).then(response => response.json()).then(data => {

      // toast(`${data.message}`, {type: data.status});
      setLocalSub(s => ({...s, coordinator: user}));
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const getStatusClass = (sub) => {
   if (sub.status === "in_progress" && sub.resource?.will_pick_up_now) {
     return "sub-in-progress-host-coming";
   }
    return `sub-${localSub.status.replace("_", "-")}`;
  };

  return <div
      className={`submission-row ${getStatusClass(localSub)}
      ${localSub.accomodation_in_the_future ? "sub-in-future" : ""} ${isActive ? "sub-active" : ""}`}>
    <div className="sub-id position-relative">
      ID ZGŁOSZENIA: {localSub.id}

      <div className="submission-row-collapse cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        Zwiń / Rozwiń
      </div>
    </div>
    <Table className="sub-table" style={{'backgroundColor': 'rgba(255, 255, 255, 0.95)', display: collapsed ? 'none' : 'table'}}>
      <tbody>
      <tr>
        <th>Imie</th>
        <td>{localSub.name}</td>
        <th>Miasto pochodzenia</th>
        <td>{localSub.city_of_origin}</td>
        <th>Polski numer telefonu</th>
        <td>
          {localSub.phone_number_pl}
          {/*<EditableField value={localSub.how_long} onRename={*/}
          {/*  (value) => updateSub(localSub, {"how_long": value}, () => setLocalSub((s) => ({...s, how_long: value})))}/>*/}
        </td>
        <th>Ukraiński numer telefony</th>
        <td>
          {localSub.phone_number_ukr}
          {/*<EditableField*/}
          {/*  value={localSub.phone_number}*/}
          {/*  onRename={(phone) => updateSub(localSub, {"phone_number": phone}, () => setLocalSub(s => ({*/}
          {/*    ...s,*/}
          {/*    phone_number: phone*/}
          {/*  })))}/>*/}
        </td>
      </tr>

      <tr>
        <th>Języki</th>
        <td>
          { [localSub.languages_pl ? 'PL' : '', localSub.languages_en ? 'EN' : '', localSub.languages_ru ? 'RU' : ''].filter(Boolean).join(' / ') }
          {/*{statusAsNumber(localSub.status) < 2 ?*/}
          {/*<input type="date" required min={new Date().toJSON().slice(0, 10)}*/}
          {/*       value={localSub.when}*/}
          {/*       onChange={(e) => {*/}
          {/*         const value = e.target.value;*/}


          {/*         if (e && localSub.when !== value) {*/}
          {/*           updateSub(localSub,*/}
          {/*               {"when": value},*/}
          {/*               () => setLocalSub((s) => ({...s, when: value}))*/}
          {/*           );*/}
          {/*         }*/}
          {/*       }}/> : localSub.when}*/}
        </td>
        <th>Inne języki:</th>
        <td>{localSub.languages_others}</td>
        <th>Liczba osób:</th>
        <td>{localSub.people_number}</td>
        <th>Kobiety wiek</th>
        <td>{localSub.women_age}</td>
      </tr>
      <tr>
        <th>Mężczyzni wiek</th>
        <td>{localSub.man_age}</td>
        <th>Dzieci wiek</th>
        <td>{localSub.children_age}</td>
        <th>Niepełnosprawni</th>
        <td>
          { localSub.disable ? "TAK, " + localSub.disable_description : "NIE" }
        </td>
        <th>Czy ktoś w ciąży</th>
        <td>
          { localSub.pregnant ? 'TAK' : 'NIE' }
          {/*<EditableField value={note} onRename={(note) => updateSub(localSub, {"note": note}, () => setNote(note))}/>*/}
        </td>
      </tr>
      <tr>
        <th>Zwierzę</th>
        <td>{localSub.traveling_with_pets ? "TAK, " + localSub.pets_description : "NIE" }</td>
        <th>Alergia na zwierzęta</th>
        <td>{localSub.pet_alergic ? 'TAK' : 'NIE'}</td>
        <th>Preferowany kraj</th>
        <td>
          { localSub.preferred_country }
        </td>
        <th>Preferowane miasto</th>
        <td>
          { localSub.preferred_city }
        </td>
      </tr>
      <tr>
        <th>Na jak długo (opis)</th>
        <td>{ localSub.how_long_desc }</td>
        <th>Na jak długo (data)</th>
        <td>{ localSub.how_long_date }</td>
        <th>Na jak długo (liczba miesięcy)</th>
        <td>{ localSub.how_long_months }</td>
        <th>Bez terminu</th>
        <td>{ localSub.how_long_infinite ? 'TAK' : 'NIE' }</td>
      </tr>
      <tr>
        <th>Czy może płacić</th>
        <td>{ localSub.can_pay ? 'TAK' : 'NIE' }</td>
        <th>Ile może płacić (PLN)</th>
        <td>{ localSub.can_pay_pln }</td>
        <th>Czy pali papierosy</th>
        <td>{ localSub.cigarettes ? 'TAK' : 'NIE' }</td>
        <th>Potrzebna praca</th>
        <td>{ localSub.job_needed ? 'TAK' : 'NIE' }</td>
      </tr>
      <tr>
        <th>Jaki rodzaj pracy</th>
        <td>{ localSub.job_desc }</td>
        <th>Samochód</th>
        <td>{ localSub.car ? 'TAK' : 'NIE' }</td>
        <th>Pieczątki wjazdu do Polski</th>
        <td>{ localSub.stamps ? 'TAK' : 'NIE' }</td>
        <th>PESEL</th>
        <td>{ localSub.pesel ? 'TAK' : 'NIE' }</td>
      </tr>

      {localSub.resource && <tr className="tr-host">
        <th>HOST</th>
        <td>{localSub.resource.name}</td>
        <td>{localSub.resource.address}</td>
        <td>{localSub.resource.phone_number}</td>
        <td>{getPickUpDisplay(localSub.resource.will_pick_up_now)}</td>
        <td colSpan={3}>{localSub.resource.note}</td>
      </tr>}
      <tr>
        <th>Osoba zgłaszająca</th>
        <td>{localSub.receiver?.display || localSub.contact_person}</td>
        <th>{["searching", "new"].includes(localSub.status) ? "Hosta szuka" : "Host znaleziony przez"}</th>
        <td>{localSub.matcher?.display || getActionBtn()}</td>
        <th>Łącznik</th>
        <td>{localSub.coordinator?.display || (localSub.matcher ? getActionBtn() : "")}</td>
        <th>
          Status
        </th>
        <td>
          {isGroupAdmin ? <Select
              values={SUB_STATE_OPTIONS.filter((o) => o.value === status)}
              options={SUB_STATE_OPTIONS}
              onChange={updateStatus}
          /> : getStatusDisplay(status)}
        </td>
      </tr>
      {isCoordinator && !isGroupAdmin && statusAsNumber(localSub.status) < 3 && <tr>
        <td className={"text-center"} colSpan={2}><Button variant={"secondary"} size={"sm"} onClick={() => updateStatus([{value: "cancelled"}])}>Nieaktualne</Button></td>
        <td colSpan={4}/>
        <td className={"text-center"} colSpan={2}><Button variant={"success"} size={"sm"} onClick={() => updateStatus([{value: "success"}])}>Sukces</Button></td>
      </tr>}
      {isActive && !readOnly && statusAsNumber(localSub.status) < 3 && <tr>
        <td className={"text-center"} colSpan={2}><Button variant={"secondary"} size={"sm"}
                                                          onClick={() => activeHandler(sub, true, true)}>Nieaktualne</Button>
        </td>
        <td colSpan={4}/>
        <td className={"text-center"} colSpan={2}><Button variant={"primary"} size={"sm"}
                                                          onClick={btnHandler}>Zwolnij</Button>
        </td>
      </tr>}
      {isGroupAdmin && !isActive && !readOnly && <tr className="no-striping">
        <th>Akcje koordynatora</th>
        <td colSpan={1} className={"text-center"}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size={"sm"}>
              Zmień źródło
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item disabled={localSub.source === "terrain"}
                             onClick={() => updateSub(localSub, {source: "terrain"})}>Zachodni</Dropdown.Item>
              <Dropdown.Item disabled={localSub.source === "webform"}
                             onClick={() => updateSub(localSub, {source: "webform"})}>Strona</Dropdown.Item>
              <Dropdown.Item disabled={localSub.source === "mail"}
                             onClick={() => updateSub(localSub, {source: "mail"})}>Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td colSpan={2} className={"text-center"}>
          {localSub.matcher &&
              <Button variant={"secondary"} size={"sm"} onClick={freeUpMatcher}>Zwolnij zgłoszenie</Button>}
        </td>
        <td colSpan={2} className={"text-center"}>
          {localSub.coordinator &&
              <Button variant={"secondary"} size={"sm"} onClick={freeUpCoord}>Zwolnij łącznika</Button>}
        </td>
      </tr>}
      </tbody>
    </Table>
    <p className="sub-id">Przyjęte: {localSub.created}</p>
  </div>;
}
