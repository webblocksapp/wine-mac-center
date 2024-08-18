import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '@components';
import { schema, useForm } from 'reactjs-ui-form-fields';
import { fileMaxSize, isRequired } from '@utils';
import { Stack } from 'reactjs-ui-core';

const meta: Meta<typeof FileInput> = {
  title: 'App Components/FileInput',
  component: FileInput,
};

export default meta;
type Story = StoryObj<typeof FileInput>;

const schema1 = schema.object({
  iconFile: schema
    .mixed<File>()
    .test({
      name: 'fileSize',
      message: 'File exceeds 5000kb',
      test: (file) => fileMaxSize(file, 5000000),
    })
    .test({
      name: 'isRequired',
      message: 'File is required',
      test: isRequired,
    })
    .required(),
});

export const Overview: Story = {
  render: () => {
    const form = useForm(schema1);

    return (
      <Stack spacing={1}>
        <FileInput
          filters={[
            { extensions: ['jpg', 'jpeg', 'png', 'icns'], name: 'images' },
          ]}
          name="iconFile"
          control={form.control}
        />
      </Stack>
    );
  },
};
