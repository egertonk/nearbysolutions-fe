import { ToolRentalListing } from "../../lib/types/DIYToolsListings";
import {
  rentInputCSS,
  SelectPickupDropoffTime,
} from "./SelectPickupDropoffTime";

type Props = {
  rentToolsAction: {
    filteredTools: ToolRentalListing[];
    handleSearch: () => void;
    hasDatePassed: (dateString: string) => boolean;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    fromDate: string;
    setFromDate: (date: string) => void;
    fromTime: string;
    setFromTime: (date: string) => void;
    setUntilDate: (date: string) => void;
    untilDate: string;
    setUntilTime: React.Dispatch<React.SetStateAction<string>>;
    untilTime: string;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const DateAndTimeInputs: React.FC<Props> = ({ rentToolsAction }) => {
  return (
    <>
      <input
        type="date"
        name="startDate"
        value={rentToolsAction.fromDate}
        onChange={(e) => rentToolsAction.setFromDate(e.target.value)}
        className={rentInputCSS}
        min={new Date().toISOString().split("T")[0]} // Sets the minimum date to today
      />

      <SelectPickupDropoffTime
        selectedDate={rentToolsAction.fromDate ?? ""}
        value={rentToolsAction.fromTime}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          rentToolsAction.setFromTime(e.target.value)
        }
      />

      <input
        type="date"
        name="returnDate"
        value={rentToolsAction.untilDate}
        onChange={(e) => rentToolsAction.setUntilDate(e.target.value)}
        className={rentInputCSS}
        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} //Data is one day ahead
      />

      <SelectPickupDropoffTime
        selectedDate={rentToolsAction.untilDate ?? ""}
        value={rentToolsAction.untilTime}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          rentToolsAction.setUntilTime(e.target.value)
        }
      />
    </>
  );
};
