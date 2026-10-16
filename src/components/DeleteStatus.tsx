import { useAppContext } from "../context/useAppContext";

export default function DeleteStatus() {
  const {
    deleteStatus,
    setUserPalettes,
    setPendingDelete,
    setDeleteStatus,
    pendingDelete,
  } = useAppContext();
  return (
    <p
      className={`
          deleteStatus
          ${deleteStatus === "deleted" && "deleted"}
          ${deleteStatus === "deleting" && "deleting"}
          ${deleteStatus === "error" && "error"}
        `}
      role="alert"
      hidden={deleteStatus === "idle"}
      onAnimationEnd={() => {
        setUserPalettes((prev) =>
          prev.filter((palette) => palette.id !== pendingDelete),
        );
        setPendingDelete(undefined);
        setDeleteStatus("idle");
      }}
    >
      {deleteStatus}
    </p>
  );
}
