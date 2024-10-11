import { AddTimerButton } from "./AddTimerButton";
import { Timerbar } from "./Timerbar";
import { TTimerITem } from "./types";

import { useDisclosure } from "@chakra-ui/react";
import { AddTimerPopup } from "./AddTimerPopup";

type TTimerListProps = {
  timersArray: TTimerITem[];
  userUid: string | null;
  setTimers: React.Dispatch<React.SetStateAction<TTimerITem[]>>; 
};

export const Timerlist = (props: TTimerListProps) => {
  const { timersArray, userUid, setTimers } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  return (
    <>
      <div className="flex flex-col gap-6">
        {timersArray.length > 0 ? (
          timersArray.map((timer: TTimerITem) => (
            <Timerbar timerItem={timer} key={timer.id} userUid={userUid} setTimers={setTimers} />
          ))
        ) : (
          <p>No timers found</p>
        )}
      </div>
      <AddTimerButton onClick={onOpen} />
      {isOpen && (
        <AddTimerPopup
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          userUid={userUid}
          setTimers={setTimers}
          
        />
      )}
    </>
  );
};
