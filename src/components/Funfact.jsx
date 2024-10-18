import { useState } from "react"

export default function Funfact() {
   const funfactsArray = [
      "Kroatien löste am 01. Januar 2023 die bisherige Währung Kuna durch den Euro ab.",
      "Rumänien plant 2029 die Einführung des Euro, nachdem es 2007 der Europäischen Union beigetreten ist.",
      "Am 12. Juli 2022 erreichte der Euro-Dollar-Wechselkurs seit fast 20 Jahren erneut ein Verhältnis von 1:1.",
      "Der Euro wurde am 1. Januar 1999 als Buchgeld eingeführt und trat am 1. Januar 2002 in Form von Bargeld in 12 EU-Ländern in Kraft.",
      "Das Euro-Symbol (€) wurde 1975 vom Deutschen Arthur Eisenmenger in Luxemburg entworfen.",
      "Über 340 Millionen Menschen in Europa nutzen den Euro als ihre Hauptwährung.",
      "Der Euro ist die gemeinsame Währung von 20 der 27 EU-Mitgliedstaaten, die zusammen als Eurozone bezeichnet werden.",
      "Um dem Euro beizutreten, müssen Länder bestimmte wirtschaftliche Kriterien erfüllen, die als Maastricht-Kriterien bekannt sind.",
      "Die erste Euro-Münze wurde am 1. Januar 2002 in Berlin geprägt, um den offiziellen Start des Euros als Bargeld zu feiern.",
      "1,95583 D-Mark pro Euro war der Wechselkurs, der am 1. Januar 1999 bei der Euro-Einführung offiziell festgelegt wurde.",
      "Bei Einführung des Euro wurden innerhalb weniger Wochen 15 Milliarden Banknoten und 52 Milliarden Münzen in Umlauf gebracht.",
      "Im Jahr 2019 wurden rund 5210 Tonnen Baumwollfasern für den Druck von Euro-Banknoten verwendet.",
      "Der ECU diente ab 1979 als Vorläufer des Euro und wurde am 1. Januar 1999 im Verhältnis 1:1 als Euro fortgeführt.",
      "DEU, NLD, BEL, LUX, FRA, IRL, ESP, ITA, EST, LVA, LTU & GRC führten den Euro 2002 als gemeinsame Währung ein.",
   ]

   const initial = funfactsArray[getRandomIndex()]
   const [funfact, setFunfact] = useState(initial)

   function getRandomIndex() {
      return Math.floor(Math.random() * funfactsArray.length)
   }

   function getNextFunfact() {
      let newFunfact = ""
      let index = funfactsArray.indexOf(funfact)

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