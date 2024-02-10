import { WineAppPipelineStatus } from '@interfaces';

const jobs = () => [
  {
    name: 'Create wine app',
    steps: [
      {
        name: 'Creating wine app',
        status: 'pending',
        output: '',
      },
      {
        name: 'Extracting wine engine',
        output: '',
      },
      {
        name: 'Generating wine prefix',
        status: 'pending',
        output: '',
      },
      {
        name: 'Enabling DXVK',
        status: 'pending',
        output: '',
      },
      {
        name: `Running winetrick steam`,
        status: 'pending',
        output: '',
      },
      {
        name: 'Running setup executable',
        status: 'pending',
        output: '',
      },
      {
        name: 'Bundling app',
        status: 'pending',
        output: '',
      },
    ],
  },
];

export const wineAppsPipelines: WineAppPipelineStatus[] = [
  {
    appId: '75a55d4f-6dcc-498a-b74a-f8765c6683e8',
    pipelineId: 'e7e92ee2-c85f-11ee-9b20-685b35922e40',
    status: 'pending',
    jobs: jobs(),
  },
  {
    appId: 'f339cf36-c576-11ee-935b-685b35922e40',
    pipelineId: '39fc709a-c860-11ee-9bee-685b35922e40',
    status: 'pending',
    jobs: jobs(),
  },
];
