import styled from 'styled-components';

const StyledLogo = styled.div`
`;

const Logo = ({ compact }) => {

    return (
        <StyledLogo id={'logo'}>
            {compact ?
                <div></div>
                :
                <div></div>
            }

        </StyledLogo>
    );
};

export default Logo;
