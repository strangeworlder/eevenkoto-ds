import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/read-aloud-box.css';
import { renderReadAloudBox } from '@eevenkoto/html';

const base = { label: 'Luettava teksti', body: 'Tunkkainen ilma valuu kosteasta käytävästä, ja jossain kaukana tippuu vesi.' } as Parameters<typeof renderReadAloudBox>[0];

const meta: Meta<Parameters<typeof renderReadAloudBox>[0]> = {
  title: 'Domain/Molecules/ReadAloudBox',
  parameters: { docs: { description: { component: "Boxed text meant to be read aloud to players: thick accent inline-start rule, optional ornament, never split across printed pages." } } },
  args: base,
  render: (args) => renderReadAloudBox(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderReadAloudBox>[0]>;

export const Default: Story = {};

export const NoOrnament: Story = { args: { ornament: false } };

export const RichBody: Story = { args: { body: undefined, bodyHtml: '<p>Ovi <em>narisee</em> auki.</p><p>Sisällä on pimeää.</p>' } };
