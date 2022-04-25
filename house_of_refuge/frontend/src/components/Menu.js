import styled from 'styled-components';
import LogoFB from './LogoFB.js';
import MenuIcon from './MenuIcon.js';
import {Link} from "react-router-dom";
import TextMultiLang from '../components/TextMultiLang';
import useComponentVisible from '../scripts/useComponentVisible';
import {useEffect, useState} from "react";
import {CmsResource} from "./CMS";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  min-height: 32px;
  display: block;
  padding: 12px;
  border-radius: 14px;
  transition: all 0.3s;

  :hover {
    background-color: #EDEDED;
    color: inherit;
  }

`;

const Button = styled.button`
  position: fixed;
  top: 5px;
  right: 52px;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    left: 10px;
    right: initial;
  }
`;

const ExtrernalLink = styled.a`
  position: fixed;
  top: 5px;
  right: 16px;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    right: 12px;
  }
`;


const MiniMenu = styled.div`
  position: fixed;
  max-width: 220px;
  background-color: white;
  top: 42px;
  right: 14px;
  border-radius: 22px;
  padding: 8px;
  z-index: 1000;
  -webkit-box-shadow: 0px 5px 28px 0px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 0px 5px 28px 0px rgba(0, 0, 0, 0.14);
  box-shadow: 0px 5px 28px 0px rgba(0, 0, 0, 0.14);

  @media (max-width: 600px) {
    left: 14px;
  }

`;


const Menu = () => {
  const {menu, button, miniMenuOpened, setMiniMenuOpened} = useComponentVisible(true);

  const [cmsPages, setCmsPages] = useState([]);

  useEffect(() => {
    if (miniMenuOpened) {
      CmsResource.getInstance().getData()
          .then(data => setCmsPages(data));
    }
  }, [miniMenuOpened]);

  return (
      <>
        <Button ref={button}> <MenuIcon/> </Button>
        {miniMenuOpened && <MiniMenu ref={menu}>
          {/*<StyledLink to="/privacy" onClick={() => setMiniMenuOpened(!miniMenuOpened)}>*/}
          {/*  <TextMultiLang*/}
          {/*      primaryText="Polityka prywatności"*/}
          {/*      secondaryText="політика конфіденційності"*/}
          {/*  />*/}
          {/*</StyledLink>*/}
          {cmsPages.map((page) => {
            return <StyledLink key={page.slug} to={"/page/" + page.slug}
                               onClick={() => setMiniMenuOpened(!miniMenuOpened)}>
              <TextMultiLang
                  primaryText={page.menu_title_primary_language}
                  secondaryText={page.menu_title_secondary_language}
              />
            </StyledLink>;
          })}
          <StyledLink to="/edit" onClick={() => setMiniMenuOpened(!miniMenuOpened)}>
            <TextMultiLang
                primaryText="Edycja danych"
                secondaryText="редагувати дані"
            />
          </StyledLink>


        </MiniMenu>}
        {/*<ExtrernalLink*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    href="https://www.facebook.com/groups/zasobygrupa"*/}
        {/*>*/}
        {/*  <LogoFB/>*/}
        {/*</ExtrernalLink>*/}
      </>
  );
};

export default Menu;
