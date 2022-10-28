import useHotspotStore from '../lib/store/hotspotStore';

interface DebuggerProps {}

const Debugger: React.FC<DebuggerProps> = () => {
  const { field, media } = useHotspotStore((state) => ({ field: state.field, media: state.media }));

  return (
    <div className="my-5 flex flex-col gap-3 bg-red-100 p-2">
      <strong className="mb-5 text-xl">DEBUGGER:</strong>
      <div>
        <strong className="text-lg">Media:</strong>
        <table className="table-fixed">
          <tbody>
            <tr>
              <th className="text-left align-top font-bold">Title:</th>
              <td className="break-all pl-3">{media?.title}</td>
            </tr>
            <tr>
              <th className="text-left align-top font-bold">Status:</th>
              <td className="break-all pl-3">{media?.status}</td>
            </tr>
            <tr>
              <th className="text-left align-top font-bold">Url:</th>
              <td className="break-all pl-3">{media?.url}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <strong className="text-lg">Field:</strong>
        <div className="space-y-5 pl-2">
          <p>
            <strong>AssetId:</strong> {field?.assetId}
          </p>
          {field?.hotspots?.map((hotspot, index) => (
            <table key={hotspot.id}>
              <tbody>
                <tr>
                  <th className="text-left underline" colSpan={2}>
                    Hotspot #{index + 1}
                  </th>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">ID:</th>
                  <td className="break-all pl-3">{hotspot.id}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">Title:</th>
                  <td className="break-all pl-3">{hotspot.title}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">Content:</th>
                  <td className="break-all pl-3">{hotspot.content}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">Dark:</th>
                  <td className="break-all pl-3">{hotspot.dark ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">X:</th>
                  <td className="break-all pl-3">{hotspot.x}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">Y:</th>
                  <td className="break-all pl-3">{hotspot.y}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">NaturalX:</th>
                  <td className="break-all pl-3">{hotspot.naturalX}</td>
                </tr>
                <tr>
                  <th className="pl-2 text-left align-top font-bold">NaturalY:</th>
                  <td className="break-all pl-3">{hotspot.naturalY}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Debugger;
