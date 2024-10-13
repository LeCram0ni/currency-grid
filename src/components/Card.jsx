
export default function Card({ children, width, height = 220, background, style }) {

   return (
      <section

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