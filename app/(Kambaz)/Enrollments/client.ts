import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollInCourse = async (courseId: string, userId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`, { userId });
  return data;
};

export const unenrollFromCourse = async (courseId: string, userId: string) => {
  await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`, { 
    params: { userId }
  });
};

export const findEnrollmentsForCurrentUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API, { params: { userId } });
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${HTTP_SERVER}/api/courses/${courseId}/users`);
  return data;
};

