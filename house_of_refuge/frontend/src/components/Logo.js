import styled from 'styled-components';

const StyledLogo = styled.div`
    .st0 {
        fill: #FFD200
    }
    .st1 {
        fill: #005EAA
    }
`;

const Logo = ({ compact }) => {

    return (
        <StyledLogo id={'logo'}>
            {compact ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 7">
                    <path d="M0,3.4c0-1.8,1.3-3,3.1-3h0c1.5,0,2.7,0.8,3,2.1h-2C4,2.3,3.6,2.1,3.2,2.1h0
		c-0.8,0-1.3,0.5-1.3,1.3c0,0.8,0.5,1.3,1.3,1.3h0c0.5,0,0.8-0.2,1-0.4h-1V3l3.1,0v0.4c0,1.6-1.3,3-3.1,3h0C1.3,6.3,0,5.2,0,3.4"/>
                    <path d="M7.7,0.5h3.1c1.5,0,2.4,1,2.4,2.2c0,0.7-0.4,1.4-1,1.8l1.1,1.7h-2.1l-0.8-1.3h-1v1.3H7.7V0.5z
		 M10.8,3.4c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6H9.5v1.3H10.8z"/>
                    <path d="M14.8,3.6V0.5h1.8v2.9c0,0.6,0.3,1.1,1,1.1h0c0.8,0,1-0.5,1-1.1V0.5h1.8v3.1
		c0,1.8-1.1,2.7-2.8,2.7h0C15.9,6.3,14.8,5.4,14.8,3.6"/>
                    <path d="M27.6,2.7c0,1.2-1,2.2-2.4,2.2h-1.3v1.3h-1.8V0.5h3.1C26.7,0.5,27.6,1.5,27.6,2.7 M25.8,2.7
		c0-0.4-0.3-0.6-0.6-0.6h-1.3v1.3h1.3C25.5,3.4,25.8,3.1,25.8,2.7"/>
                    <path d="M32.4,5.3h-2.2L30,6.2h-1.8l1.5-5.7H33l1.5,5.7h-1.8L32.4,5.3z M32,3.7l-0.4-1.6h-0.5
		l-0.4,1.6H32z"/>
                    <polygon points="44,2.1 41.4,4.7 44,4.7 44,6.2 38.9,6.2 38.9,4.7 41.6,2.1 38.9,2.1 38.9,0.5 44,0.5
			"/>
                    <path d="M49.6,5.3h-2.2l-0.2,0.9h-1.8l1.5-5.7h3.3l1.5,5.7h-1.8L49.6,5.3z M49.1,3.7l-0.4-1.6h-0.5
		l-0.4,1.6H49.1z"/>
                    <path d="M58.2,4.4c0,1.2-0.8,2-2.8,2h-0.1c-2.3,0-2.7-1.3-2.7-2h1.8c0,0.3,0.4,0.4,1,0.4h0
		c0.6,0,0.9-0.1,0.9-0.4c0-0.2-0.1-0.3-0.6-0.3h-0.9c-1.4,0-2.1-0.7-2.1-1.7c0-1,0.6-2,2.7-2h0.1c2.3,0,2.6,1.4,2.6,2h-1.8
		C56.2,2.2,56,2,55.4,2h0c-0.7,0-0.8,0.2-0.8,0.4c0,0.2,0.1,0.3,0.5,0.3h1.1C57.5,2.6,58.2,3.3,58.2,4.4"/>
                    <path d="M65.8,3.4c0,1.8-1.3,3-3.1,3h0c-1.8,0-3.1-1.2-3.1-3c0-1.8,1.3-3,3.1-3h0
		C64.5,0.4,65.8,1.6,65.8,3.4 M64,3.4c0-0.7-0.5-1.3-1.3-1.3h0c-0.8,0-1.3,0.5-1.3,1.3c0,0.8,0.5,1.3,1.3,1.3h0
		C63.5,4.7,64,4.1,64,3.4"/>
                    <path d="M72.4,3.4c0.3,0.3,0.4,0.6,0.4,1c0,1-0.8,1.8-1.8,1.8h-3.7V0.5H71c1,0,1.8,0.8,1.8,1.8
		C72.8,2.8,72.7,3.1,72.4,3.4 M69,2.7h1.7c0.1,0,0.3-0.1,0.3-0.3s-0.1-0.3-0.3-0.3H69V2.7z M71,4.3C71,4.2,70.9,4,70.7,4H69v0.6h1.6
		C70.9,4.7,71,4.5,71,4.3"/>
                    <polygon points="80,0.5 77.7,4.1 77.7,6.2 75.9,6.2 75.9,4.1 73.6,0.5 75.7,0.5 76.8,2.4 77.9,0.5
		"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 71" >
                    <circle className="st0" cx="31.6" cy="47.7" r="6.2" />
                    <circle className="st0" cx="31.6" cy="25" r="6.2" />
                    <circle className="st0" cx="20.2" cy="36.4" r="6.2" />
                    <circle className="st0" cx="43" cy="36.4" r="6.2" />
                    <polygon className="st1" points="55.5,32.9 31.6,8.9 7.6,32.9 3.1,28.4 31.6,0 60,28.4 	" />
                    <path d="M1.3,51.3c1.2-0.9,2.8-0.6,3.6,0.6C5,51.9,5,52,5.1,52l0,0c0.8,1,0.8,2.4,0,3.3l-1-1.5
		c0.1-0.3,0-0.7-0.2-1l0,0c-0.3-0.5-1-0.7-1.5-0.3c0,0-0.1,0-0.1,0.1c-0.5,0.3-0.7,1-0.4,1.5c0,0,0,0.1,0.1,0.1l0,0
		c0.2,0.3,0.5,0.5,0.8,0.5l-0.5-0.7l1-0.6l1.6,2.3l-0.3,0.2c-1.2,0.8-2.8,0.6-3.7-0.6c0,0-0.1-0.1-0.1-0.1l0,0
		C-0.1,54,0,52.4,1.1,51.4C1.2,51.4,1.2,51.3,1.3,51.3z"/>
                    <path d="M7.3,55.1l2,1.9c0.9,0.7,1,2,0.3,2.8c0,0-0.1,0.1-0.1,0.1c-0.4,0.5-1.1,0.7-1.7,0.6l-0.3,1.8L6.1,61
		l0.3-1.3L5.7,59l-0.8,0.8l-1.2-1.1L7.3,55.1z M7.5,58.8c0.2,0.2,0.6,0.2,0.8,0c0.2-0.2,0.2-0.6,0-0.8l-0.8-0.8L6.7,58L7.5,58.8z"/>
                    <path d="M10.2,61.5l1.5-2.3L13,60l-1.5,2.2c-0.3,0.4-0.3,0.9,0.1,1.2c0,0,0.1,0.1,0.1,0.1l0,0
		c0.4,0.3,0.9,0.2,1.2-0.2c0-0.1,0.1-0.1,0.1-0.2l1.4-2.2l1.3,0.9l-1.5,2.3c-0.9,1.3-2.1,1.5-3.4,0.6l0,0C9.6,64,9.3,62.8,10.2,61.5
		z"/>
                    <path d="M20.7,66.1c-0.4,1-1.6,1.5-2.6,1c0,0-0.1,0-0.1-0.1l-1.1-0.4l-0.4,1.1l-1.5-0.6l1.9-4.7l2.6,1.1
		c1.1,0.3,1.6,1.5,1.3,2.5C20.7,66,20.7,66.1,20.7,66.1z M19.2,65.5c0.1-0.3,0-0.6-0.3-0.7c0,0,0,0,0,0l-1.1-0.4l-0.4,1l1.1,0.5
		C18.8,65.9,19.1,65.8,19.2,65.5L19.2,65.5z"/>
                    <path d="M24.4,69.4L22.5,69l-0.4,0.7l-1.6-0.4l2.4-4.7l2.8,0.6l0.2,5.3l-1.6-0.4L24.4,69.4z M24.3,67.9l-0.1-1.5
		l-0.4-0.1l-0.7,1.3L24.3,67.9z"/>
                    <path d="M35.2,67.1L33,69.5l2.4-0.1l0.1,1.4L30.8,71l-0.1-1.4l2.3-2.4l-2.3,0.1l-0.1-1.4l4.5-0.2L35.2,67.1z" />
                    <path d="M40.6,69l-1.9,0.4v0.8l-1.6,0.4l0.2-5.3l2.8-0.6l2.4,4.7L41,69.7L40.6,69z M39.9,67.7l-0.7-1.3l-0.4,0.1
		l0,1.5L39.9,67.7z"/>
                    <path d="M47.9,65.4c0.4,1,0,1.9-1.6,2.6L46.2,68c-1.9,0.8-2.6-0.1-2.9-0.7l1.5-0.6c0.1,0.2,0.5,0.2,1,0l0,0
		c0.5-0.2,0.7-0.4,0.6-0.6c-0.1-0.2-0.2-0.2-0.6-0.1l-0.8,0.3c-1.2,0.5-2,0.2-2.3-0.6s-0.2-1.9,1.5-2.6l0.1,0
		c1.9-0.8,2.6,0.3,2.8,0.7l-1.5,0.6c-0.1-0.2-0.4-0.3-0.8-0.1l0,0c-0.6,0.2-0.6,0.4-0.6,0.6s0.2,0.2,0.5,0.1l0.9-0.4
		C46.7,64.2,47.6,64.6,47.9,65.4z"/>
                    <path d="M53.5,60.8c0.8,1.2,0.5,2.8-0.6,3.6c-0.1,0.1-0.1,0.1-0.2,0.1l0,0c-1.2,0.9-2.8,0.6-3.7-0.5
		c-0.9-1.2-0.6-2.8,0.5-3.7c0.1,0,0.1-0.1,0.2-0.1l0,0c1.1-0.9,2.8-0.7,3.6,0.4C53.4,60.7,53.4,60.8,53.5,60.8z M52.1,61.7
		c-0.3-0.5-1-0.7-1.5-0.4c0,0-0.1,0-0.1,0.1l0,0c-0.5,0.3-0.7,1-0.4,1.5c0,0,0,0.1,0.1,0.1c0.3,0.5,1,0.7,1.5,0.4c0,0,0.1,0,0.1-0.1
		l0,0C52.3,63,52.5,62.4,52.1,61.7C52.1,61.8,52.1,61.8,52.1,61.7z"/>
                    <path d="M57.8,56.6c0.3,0,0.7,0.2,0.9,0.4c0.6,0.6,0.6,1.7,0,2.3c0,0,0,0,0,0l-2.3,2.3l-3.6-3.6l2.3-2.3
		c0.6-0.6,1.7-0.6,2.3,0c0,0,0,0,0,0C57.7,56,57.8,56.3,57.8,56.6z M55.2,58.3l1.1-1c0.1-0.1,0.1-0.3,0-0.4s-0.3-0.1-0.4,0l-1.1,1
		L55.2,58.3z M57.5,58.2c-0.1-0.1-0.3-0.1-0.4,0l-1,1l0.4,0.4l1-1C57.6,58.4,57.6,58.3,57.5,58.2z"/>
                    <path d="M59.8,49.7l1.4,3.5l1.6,1.1l-0.9,1.3l-1.6-1.1l-3.8-0.1l1.1-1.5l1.9,0.1l-0.8-1.8L59.8,49.7z" />
                </svg>
            }

        </StyledLogo>
    );
};

export default Logo;
