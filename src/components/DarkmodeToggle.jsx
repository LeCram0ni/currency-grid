import { useState } from "react"

import MoonFullIcon from "../assets/MoonFullIcon"
import MoonLineIcon from "../assets/MoonLineIcon"
import SunFullIcon from "../assets/SunFullIcon"
import SunLineIcon from "../assets/SunLineIcon"

export default function DarkmodeToggle({ switchMode, isDarkMode }) {

   const [isHovering, setIsHovering] = useState(false)

   let darkModeIconStatus = null

   const icons = [
      { Icon: SunFullIcon },
      { Icon: SunLineIcon },
      { Icon: MoonFullIcon },
      { Icon: MoonLineIcon },
   ];

   const iconArray = icons.map(({ Icon }) => (
      <Icon
         key={Icon.name}
         onClick={switchMode}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      />
   ));

   if (isDarkMode) {
      if (isHovering) darkModeIconStatus = 0
      else darkModeIconStatus = 1
   } else {
      if (isHovering) darkModeIconStatus = 2
      else darkModeIconStatus = 3
   }

   function handleMouseEnter() {
      setIsHovering(true)
   }

   function handleMouseLeave() {
      setIsHovering(false)
   }

   return (<>
      <div className="icon-container">
         {iconArray[darkModeIconStatus]}
      </div>
   </>)
}