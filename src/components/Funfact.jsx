import { useState } from "react"

export default function Funfact() {
   const funfactsArray = [
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
      "Die Einführung des Euro war eine gewaltige logistische Aufgabe, bei der unter strengsten Sicherheitsauflagen innerhalb weniger Wochen 15 Milliarden Banknoten und 52 Milliarden Münzen in Umlauf gebracht wurden.",
      "Im Jahr 2019 wurden rund 5210 Tonnen Baumwollfasern für den Druck von Euro-Banknoten verwendet.",
      "Die Zahl der im Umlauf befindlichen Euro-Banknoten ist von 7,8 Milliarden im Jahr 2002 auf 27,6 Milliarden im November 2021 gestiegen. Im November 2021 belief sich ihr Wert Schätzungen zufolge auf insgesamt 1,5 Billionen Euro, gegenüber 246 Milliarden Euro im Jahr 2002."

   ]

   const initial = funfactsArray[getRandomIndex()]
   const [funfact, setFunfact] = useState(initial)

   function getRandomIndex() {
      return Math.floor(Math.random() * funfactsArray.length)
   }

   function getNextFunfact() {
      let newFunfact = ""
      let index = funfactsArray.indexOf(funfact)
      console.log("index " + index)
      if (index < funfactsArray.length - 1) {
         newFunfact = funfactsArray[index + 1]
      } else {
         newFunfact = funfactsArray[0]
      }
      setFunfact(newFunfact)
   }

   return (<>
      <div className="flex line-height-small funfact" onClick={getNextFunfact}>
         {funfact}
      </div>
   </>)
}