import { Combobox } from "../shared/Combobox";
import { Input } from "../ui/input";

interface SnippetFilterProps {
    search: string;
    setSearch: (value: string) => void;
    technology: string;
    setTechnology: (value: string) => void;
}

const SnippetFilter = ({ search, setSearch, technology, setTechnology }: SnippetFilterProps) => {

    return (
        <div className="mb-4 flex space-x-4">
            <Input
                type="text"
                placeholder="Search snippets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow"
            />
            <Combobox
                value={technology}
                onChange={setTechnology}
                placeholder="Select technology"
                className="w-[200px]"
            />
        </div>
    );
};

export default SnippetFilter;