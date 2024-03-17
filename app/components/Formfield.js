import Image from "next/image";
import React from "react";
import style from "./style.css";

const FormField = (props) => {
   return (
      <>
         <div
        
            className={`d-flex gap-2 mx-2 align-items-top flex-nowrap ${
               props?.isMargin == false ? "" : "mt-3"
            }  pt-2 ${props?.removeBorder ? "" : "active-header-link"} `}
         >
            {props?.svg ? (
               <Image
                  src={props?.svg}
                  width={21}
                  height={21}
                  alt=""
                  className={`position-relative ${style.fieldsIcons}`}
               />
            ) : (
               props.icon != null && (
                  <span
                     className={`${props.icon} d-inline-block fs-20 position-relative ${style.fieldsIcons}`}
                  >
                     {[...Array(props.iconPath)].map((_, index) => (
                        <span key={index} className={`path${index + 1}`} />
                     ))}
                  </span>
               )
            )}

            <div className="d-flex ps-3 w-100 flex-column">
               <label className="ps-0 fs-16">{props?.label}</label>

               {props?.value}
            </div>
         </div>
      </>
   );
};

export default FormField;
