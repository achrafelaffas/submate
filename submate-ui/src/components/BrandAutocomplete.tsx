import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Search } from "lucide-react";

export interface Brand {
  name: string;
  domain: string;
  icon?: string;
  claimed?: boolean;
}

interface BrandAutocompleteProps {
  onSelect?: (brand: Brand) => void;
  placeholder?: string;
}

const BrandAutocomplete: React.FC<BrandAutocompleteProps> = ({
  onSelect,
  placeholder = "Search brands...",
}) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        event.target instanceof Node &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchBrands = async (searchTerm: string): Promise<void> => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.brandfetch.io/v2/search/${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as Brand[];
      setResults(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching brands:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    const timeoutId = setTimeout(() => {
      searchBrands(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSelectBrand = (brand: Brand) => {
    setQuery(brand.name);
    setIsOpen(false);
    onSelect?.(brand);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-10 pl-10 rounded-lg border bg-background
            focus:outline-none focus:ring-2 focus:ring-primary
            "
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />
          <Search
            className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
            size={20}
            aria-hidden="true"
          />
        </div>

        {isOpen && (results.length > 0 || loading) && (
          <div
            className="absolute w-full mt-1 bg-background border max-h-60 overflow-auto"
            role="listbox"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : (
              results.map((brand) => (
                <div
                  key={brand.domain}
                  onClick={() => handleSelectBrand(brand)}
                  className="flex items-center p-3 
                           hover:bg-gray-50 dark:hover:bg-gray-700 
                           cursor-pointer
                           transition-colors duration-150"
                  role="option"
                  aria-selected={query === brand.name}
                >
                  {brand.icon && (
                    <img
                      src={brand.icon}
                      alt={`${brand.name} logo`}
                      className="w-6 h-6 mr-3"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {brand.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {brand.domain}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandAutocomplete;
