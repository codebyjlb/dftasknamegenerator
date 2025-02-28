import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ClientProps {
    clientSelected: (clientName: string) => void;
}
const clients = [
  { name: "ALSO Software", code: "ASFT" },
  { name: "Cloudway", code: "CW" },
  { name: "Point Taken", code: "PT" },
  { name: "Advania Norge", code: "ADV" },
  { name: "Infosoft", code: "INF" },
  { name: "BSure", code: "BS" },
  { name: "QBig", code: "QBG" },
  { name: "ItSMF", code: "SMF" },
  { name: "Cartagena", code: "CTG" },
  { name: "Business Analyze", code: "BA" },
  { name: "Spirhed", code: "SPR" },
  { name: "Marstrand AS", code: "MRS" },
  { name: "Baseline AS", code: "BSL" },
  { name: "Jernbanepensjonistene", code: "JBP" },
  { name: "Digitalfeet", code: "DF" },
];


export function SelectClient({ clientSelected }: ClientProps) {

  return (
    <Select onValueChange={clientSelected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Client" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {clients.map((client) => (
               <SelectItem key={client.code} value={client.code}>{client.name}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
