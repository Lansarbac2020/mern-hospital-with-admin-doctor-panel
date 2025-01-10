import { createContext } from "react";

export const AppContext =createContext()

const AppContextProvider=(props)=>{

    //currency
    const currency='₹';

    const calculateAge=(dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();

        return age;
        
    }
    const slotDateFormat = (slotDate) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
        if (!slotDate) return "Invalid Date"; // Handle empty input
      
        try {
          // Split the date string by '-' instead of '_'
          const dateArray = slotDate.split('-');
          if (dateArray.length === 3) {
            const day = parseInt(dateArray[0], 10); // Extract day
            const monthIndex = parseInt(dateArray[1], 10); // Extract month (adjusting for 1-based index)
            const year = dateArray[2]; // Extract year
      
            // Handle invalid month or day values
            if (monthIndex < 1 || monthIndex > 12 || isNaN(day) || isNaN(monthIndex)) {
              return "Invalid Date";
            }
      
            const month = months[monthIndex - 1]; // Adjust for zero-based index
            return `${day} ${month} ${year}`;
          }
          return "Invalid Date"; // Fallback for invalid input format
        } catch (error) {
          console.error("Error formatting slotDate:", error);
          return "Invalid Date";
        }
      };

    const value={
      calculateAge,
      slotDateFormat,currency
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;