import useParams from "../../hook/useParams";

export function Book() {
  const params = useParams();
  return <div>{params.id}</div>;
}
