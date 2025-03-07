import React, { useEffect } from "react";
import { TbCircleXFilled } from "react-icons/tb";
import { HiMenuAlt4 } from "react-icons/hi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromPlayNext,
  reorderPlayNext,
} from "../../../app/slices/activePlayerSlice";

const PlayNext = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "static";
    };
  }, []);

  // Get the playNext queue from Redux
  const playNext = useSelector((state) => state.activePlayer.playNext);

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return; // If the item is dropped outside a valid destination, do nothing.

    // Reorder the playNext queue
    const reorderedList = Array.from(playNext);
    const [movedItem] = reorderedList.splice(source.index, 1);
    reorderedList.splice(destination.index, 0, movedItem);

    // Dispatch the updated order to Redux
    dispatch(reorderPlayNext(reorderedList));
  };

  const handleRemove = (id) => {
    dispatch(removeFromPlayNext(id));
  };

  return (
    <div className="absolute w-full md:top-[-20rem] top-[-13rem] z-50 py-4">
      <div className="grid grid-cols-12 items-center pr-8 md:pr-12">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-10 col-span-12 bg-[#222222] rounded-lg px-5 py-4 min-h-[310px] max-h-[310px] overflow-y-auto">
          <p className="text-xl mb-5">Playing Next</p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="play-next">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col">
                  {playNext.length > 0 ? (
                    playNext.map((play, index) => (
                      <Draggable
                        key={play.id}
                        draggableId={play.id}
                        index={index}>
                        {(provided) => (
                          <div
                            className="flex items-center justify-between text-white mb-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="flex items-center gap-3 w-full">
                              <TbCircleXFilled
                                className="text-xl cursor-pointer"
                                onClick={() => handleRemove(play.id)}
                              />
                              <img
                                alt={play.name}
                                src={play.imageUrl}
                                className="rounded-md w-12 h-12 md:w-16 md:h-16"
                              />
                              <p className="truncate w-32 md:w-48">{`${play.name} - Episode ${play.episode}`}</p>
                            </div>
                            <HiMenuAlt4 className="text-xl" />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-sm mb-5">Nothing added to play next</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default PlayNext;
