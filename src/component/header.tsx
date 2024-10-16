import React from 'react';
import styled from "styled-components";
import Link from "next/link";


function Cheader() {
    return (
        <Sheader>
            <Snav>
                <Sul className="main-nav">
                    <li><Link href="/"><Simg className="logo" src="/images/log11o.jpg" alt="ホーム"/></Link></li>
                    <li><Link href="/"><Timg className="logo" src="/images/logo3.png" alt="ホーム"/></Link></li>
                    {/*<Sli><SLink href="/">Fumihiro Endo</SLink></Sli>*/}
                </Sul>
                <S2ul className="pages">
                    <li><Link href="/PageAbout"><Sp>About</Sp></Link></li>
                    <li><Link href="/PageEvent"><Sp>Event</Sp></Link></li>
                    <li><Link href="/PageContact"><Sp>Contact</Sp></Link></li>
                </S2ul>
            </Snav>
        </Sheader>
    );
}


const Sp =styled.p`
  font-family: "Edu AU VIC WA NT Guides", cursive;
  color: black;
  font-size: 30px;
  margin: 0.5rem;
  @media (min-width: 580px) {
    margin: 1.5rem;
  }

  @media (min-width: 465px) and (max-width: 580px) {
    font-size: 30px;
  }

  @media (max-width: 465px) {
    font-size: 20px;
  }
`;

const Sheader = styled.header`
  background-image: url(/images/back.jpg);
  background-size: contain;
  box-shadow: 0 2px 7px 0 rgba(0,0,0, 0.2);
`;

const Simg = styled.img`
  width: 100%; /* 固定サイズに変更 */
  height: 70px;
  @media (min-width: 678px) {
    height: 0px;
  }
`;

const Timg = styled.img`
  width: 100%;
  @media(min-width: 1130px) {
    height: 70px;
  }
  @media(min-width: 677px) and (max-width: 800px) {
    height: 40px
  }
  @media(max-width: 677px) {
    height: 0px
  }
`;



const S2ul = styled.ul`
  display: flex;
  padding: 0;
  margin: 1rem;
  list-style: none;
  color: #f7f9ff;
  align-items: center; /* 高さを揃える */
  height: 70px; /* 高さをSulと同じに */
  width: 60%;
  flex-grow: 1; /* 画面幅に合わせて成長させる */
  justify-content: flex-end; /* 子要素を右寄せ */
  text-color: black;
`;

const Sul = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center; /* 高さを揃える */
  height: 70px;
  margin-left: 1rem;
  width: 40%;
`;
  
const Snav = styled.nav`
  display: flex;
  align-items: center;
  height: 70px; /* 全体の高さを統一 */
  width: 100%;
  justify-content: space-between; /* SulとS2ulの隙間をなくす */
  padding: 0;
  margin: 0;
`;


export default Cheader;