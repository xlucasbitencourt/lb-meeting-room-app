export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
