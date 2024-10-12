export default function Funfact() {

   const funfacts = [
      "Kroatien löste am 01. Januar 2023 die bisherige Währung Kuna durch den Euro ab.",
      "Rumänien möchte den Euro 2029 einführen.",
      "Am 12. Juli 2022 erreichte der Euro-Dollar-Wechselkurs seit fast 20 Jahren erneut ein Verhältnis von 1:1.",
      "Der Euro wurde am 1. Januar 1999 als Buchgeld eingeführt und trat am 1. Januar 2002 in Form von Bargeld in 12 EU-Ländern in Kraft.",
      "Das Euro-Zeichen (€) wurde 1996 entworfen.",
      "Über 340 Millionen Menschen in Europa nutzen den Euro als ihre Hauptwährung.",
      "Der Euro ist die gemeinsame Währung von 20 der 27 EU-Mitgliedstaaten, die zusammen als Eurozone bezeichnet werden.",
      "Um dem Euro beizutreten, müssen Länder bestimmte wirtschaftliche Kriterien erfüllen, die als Maastricht-Kriterien bekannt sind. Diese Kriterien betreffen unter anderem Inflation, öffentliche Schulden und Wechselkursstabilität.",
      "Die erste Euro-Münze wurde am 1. Januar 2002 in Berlin geprägt, um den offiziellen Start des Euros als Bargeld zu feiern.",
      "Viele Länder haben beim Euro-Wechselkurs einen festen Wechselkurs zur nationalen Währung, um Stabilität zu gewährleisten. Zum Beispiel wurde der Wechselkurs der D-Mark auf 1,95583 D-Mark pro Euro festgelegt.",

   ]

   return (<>
      <div className="flex line-height-small funfact">
         {funfacts[Math.floor(Math.random() * funfacts.length)]}
      </div>
   </>)
}