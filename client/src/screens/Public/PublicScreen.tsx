import React, { useState } from "react";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@apollo/client";

export default function Public() {
  // const [parent] = useAutoAnimate<HTMLUListElement>();

  // const [getAllWilders, { data, loading, error, refetch }] =
  //   useLazyQuery<IWilderData>(GET_ALL_WILDERS);
//   const { data, loading, error, refetch } =
//     useQuery<IWilderData>(GET_ALL_WILDERS);

 
//   if (error) {
//     return <div>Il y a une erreur</div>;
//   }
  return (
    <div>
      <ul >
        <li>Liste 1</li>
      </ul>
    </div>
  );
}
