/* eslint-disable @next/next/no-assign-module-variable */

"use client";

import { useState, useEffect } from "react";
import * as client from "../../client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
   const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid as string };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };
  const onRemoveModule = async (moduleId: string) => {
    if (typeof cid === "string") {
            await client.deleteModule(cid, moduleId);
        }
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

   const onUpdateModule = async (module: any) => {
    if (typeof cid === "string") {
            await client.updateModule(cid, module);
        }
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };



  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFacultyOrTA =
    currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  return (
    <div className="wd-modules">
      {isFacultyOrTA && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />

                  {!module.editing && <span>{module.name}</span>}

                  {isFacultyOrTA && module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      autoFocus
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({
                            ...module,
                            name: (e.target as HTMLInputElement).value,
                          })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                           onUpdateModule({ ...module, editing: false });
                        }
                      }}
                    />
                  )}
                </div>

                {isFacultyOrTA && (
                  <ModuleControlButtons
                    moduleId={module._id}
deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex justify-content-between"
                    >
                      <span>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      </span>
                      {isFacultyOrTA && <LessonControlButtons />}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}