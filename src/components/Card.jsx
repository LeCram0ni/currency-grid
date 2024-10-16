export default function Card({ children, height = 220, background, style, className, id }) {

   return (
      <section className={className} id={id}

         style={{
            background: background,
            height: `${height}px`,
            ...style
         }}>
         {children}
      </section>
   )
}