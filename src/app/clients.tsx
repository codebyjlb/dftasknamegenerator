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
  "Advania",
  "ALSO Software",
  "Cloudway",
  "QBig",
  "Point Taken",
  "Advania Norge",
  "Infosoft",
  "BSure",
  "ItSMF",
  "Cartagena",
  "Business Analyze",
  "Spirhed",
  "Marstrand AS",
  "Baseline AS",
  "Jernbanepensjonistene",
  "Digitalfeet",
]


export function SelectClient({ clientSelected }: ClientProps) {
  return (
    <Select >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Client" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {clients.map((client) => (
               <SelectItem key={client} value={client} onClick={() => clientSelected(client)}>{client}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
