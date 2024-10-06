/* eslint-disable react/prop-types */
export default function Card({ children, width, height, dropdownHandler, background, style }) {

   return (
      <section
         onClick={dropdownHandler}
         style={{
            background: background,
            gridColumn: `span ${width}`,
            height: `${height}px`,
            ...style
         }}>
         {children}
      </section>
   )
}