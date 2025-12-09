import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};


export const updateModule = async (courseId: string, module: any) => {
   const { data } = await axios.put(
   `${COURSES_API}/${courseId}/modules/${module._id}`,
   module
 );
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axios.delete(
   `${COURSES_API}/${courseId}/modules/${moduleId}`
 );
 return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async (userId?: string) => {
  const url = userId 
    ? `${USERS_API}/current/courses?userId=${userId}`
    : `${USERS_API}/current/courses`;
  const { data } = await axiosWithCredentials.get(url);
  return data;
};

export const createCourse = async (course: any, userId?: string) => {
  const body = userId ? { ...course, userId } : course;
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, body);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};





