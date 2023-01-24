import styled from "styled-components";
import { NavLink } from "react-router-dom";




export const Link = styled(NavLink)`
  /* padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500; */

  display: inline-block;
  text-decoration: none;
  padding: 8px 16px;
  /* padding: 12px; */
  font-weight: 700;
  /* border: solid 1px; */
  border-radius: 4px;
  color: #2a363b;

  &.active {
    /* color: #e84a5f; */
    color: white;
    background-color: orangered;
  }
`;


// .link {
//   display: inline - block;
//   text - decoration: none;
//   padding: 12px;
//   font - weight: 700;
//   color: #2a363b;
// }

// .link.active {
//   color: #e84a5f;
// }