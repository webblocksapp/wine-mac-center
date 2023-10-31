import { ScaffoldApp } from './ScaffoldApp';
import { ExtractEngine } from './ExtractEngine';
import { Wineboot } from './Wineboot';
import { EnableDxvk } from './EnableDxvk';
import { Winetrick } from './Winetrick';
import { RunExe } from './RunExe';
import { BundleApp } from './BundleApp';

export const Wine: React.FC = () => {
  return (
    <div>
      <ScaffoldApp />
      <ExtractEngine />
      <Wineboot />
      <EnableDxvk />
      <Winetrick />
      <RunExe />
      <BundleApp />
    </div>
  );
};
