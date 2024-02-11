import { WineAppPipelineStatus } from '@interfaces';
import { ProcessStatus, WineAppJob } from 'neu-wine-api';

const jobs = (): WineAppJob[] => [
  {
    name: 'Create wine app',
    steps: [
      {
        name: 'Creating wine app',
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: 'Extracting wine engine',
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: 'Generating wine prefix',
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: 'Enabling DXVK',
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: `Running winetrick steam`,
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: 'Running setup executable',
        status: ProcessStatus.Pending,
        output: '',
      },
      {
        name: 'Bundling app',
        status: ProcessStatus.Pending,
        output: '',
      },
    ],
  },
];

export const wineAppsPipelines: WineAppPipelineStatus[] = [
  {
    appId: '75a55d4f-6dcc-498a-b74a-f8765c6683e8',
    pipelineId: 'e7e92ee2-c85f-11ee-9b20-685b35922e40',
    status: ProcessStatus.Pending,
    jobs: jobs(),
  },
  {
    appId: 'f339cf36-c576-11ee-935b-685b35922e40',
    pipelineId: '39fc709a-c860-11ee-9bee-685b35922e40',
    status: ProcessStatus.Pending,
    jobs: jobs(),
  },
];
