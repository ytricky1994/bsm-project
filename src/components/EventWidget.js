import React, { useState, useEffect } from "react";
import { DetailsList } from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react";
import "office-ui-fabric-react/dist/css/fabric.css";
import { DateTime } from "luxon";

const operations = [
  {
    from: "0000",
  },
];

/*Defining Collumns of data*/
const columns = [
  {
    key: "column1",
    name: "From",
    fieldName: "from",
    minWidth: 100,
    maxWidth: 360,
    isResizable: true,
  },
];

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
  },
});

const EventWidget = () => {
  //useState [variable, functionVariable] = Default Value
  const [events, setEvents] = useState([{ ID: "test" }]);

  const [currectTime, setCurrentTime] = useState(
    //set Current time - 1
    DateTime.now().minus({ day: 1 }).toISODate()
  );
  // console.log("Curent time is " + currectTime.toString());

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://prod-179.westeurope.logic.azure.com:443/workflows/7c84997dd6894507a60796acb06e5c43/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6hFoizfo2w62d0iQK_Zyt7a3Ycr9akAkXdCPAG0ecwQ&usr=52616661656c",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache",
        }
      )
        .then((res) => res.json())
        .then((json) => setEvents(json));

      // console.log(events)
    };

    fetchData();
     
  }, []);

  //Array of Object in Events
  // console.log(events.value);
  return (
    <div data-is-scrollable={true}>
      {/* <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
        <DetailsList items={operations} columns={columns} selectionMode={0} />
      </div> */}

      {events.value?.map((items) => (
        <div key={items.ID}>
          <div className={"plain-text-event-widget"}>
            <p>
              <a className={"event-hover-effect"} href={items.BannerUrl}>
                {items.Title} - {items.EventStartDate}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventWidget;
