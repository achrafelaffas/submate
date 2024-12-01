import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "./ui/input";

type TQuery = {
  name: string;
  domain: string;
  icon: string;
};

export type TAutocomplete = {
  value: string;
  query?: TQuery;
  queries: TQuery[];
};

interface IAutocomplete {
  onSubmit: ({ value, queries, query }: TAutocomplete) => void;
  placeholder: string;
}

const Autocomplete = ({ onSubmit, placeholder }: IAutocomplete) => {
  const [value, setValue] = useState({ text: "", active: false });
  const [queries, setQueries] = useState<TQuery[]>([]);

  const handleClick = (query: TQuery) => {
    onSubmit({ value: value.text, query, queries });
    setValue({ text: query.domain, active: false });
    setQueries([]);
  };

  const getQueries = useCallback(async (searchValue: string) => {
    if (searchValue !== "") {
      try {
        const url = `https://api.brandfetch.io/v2/search/${searchValue}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setQueries(data);
        }
      } catch (err) {
        console.log("Something went wrong, try again later.");
      }
      return;
    }

    setQueries([]);
  }, []);

  useEffect(() => {
    if (value.text) getQueries(value.text);
  }, [getQueries, value.text]);

  return (
    <Command className=" border">
      <Input
        className="no-focus-border rounded-none border-0 "
        placeholder={placeholder}
        value={value.text}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue({ text: e.target.value, active: true })
        }
      />
      <CommandList className={cn(queries.length == 0 && "hidden")}>
        {queries.length > 0 && (
          <CommandGroup heading="Suggestions">
            {queries.map((query, i) => (
              <div key={i} onClick={() => handleClick(query)}>
                <CommandItem value={query.name || "None"}>
                  <img src={query.icon} className="mr-2 h-8 w-8" />
                  <span className="text-lg">{query.name}</span>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default Autocomplete;
