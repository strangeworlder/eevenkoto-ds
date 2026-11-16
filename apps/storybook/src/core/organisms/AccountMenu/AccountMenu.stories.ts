import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/account-menu.css';
import { renderAccountMenu, type AccountMenuProps } from '@eevenkoto/html';

const entries: AccountMenuProps['entries'] = [
  { id: 'profile', label: 'Profiili', href: '#profile', icon: 'user' },
  { id: 'logout', label: 'Kirjaudu ulos', tone: 'destructive', icon: 'logout' },
];

const meta: Meta<AccountMenuProps> = {
  title: 'Core/Organisms/AccountMenu',
  parameters: {
    docs: {
      description: {
        component:
          'Account trigger and profile popover. Signed out: a full-width sign-in link. Signed in: avatar, name and tier badge that open a popover with summary, menu and optional footer. Visibility is owned by the app (`open`).',
      },
    },
  },
  argTypes: {
    id: { control: 'text', description: 'Optional host `<div id>`.' },
    authenticated: { control: 'boolean' },
    open: { control: 'boolean' },
    loginHref: { control: 'text', description: 'Signed-out sign-in link URL.' },
    loginLabel: { control: 'text', description: 'Signed-out sign-in CTA label.' },
    userName: { control: 'text' },
    userEmail: { control: 'text' },
    avatarSrc: { control: 'text', description: 'Signed-in user avatar image URL.' },
    tierLabel: { control: 'text' },
    tierIntent: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'caution', 'critical', 'admin'],
    },
    menuLabel: { control: 'text', description: 'Accessible label for the inner `Menu`.' },
    popoverLabel: { control: 'text', description: 'Accessible label for the `Popover`.' },
    entries: { control: 'object', description: 'Account `MenuEntry[]` items.' },
    footer: { control: 'text', description: 'Optional footer HTML inside the popover.' },
  },
  args: { authenticated: true, userName: 'Aino Seikkailija', userEmail: 'aino@example.com', tierLabel: 'Kannattaja', tierIntent: 'info', entries },
  render: (args) => `<div style="max-inline-size: 22rem; min-block-size: ${args.open ? '20rem' : 'auto'}">${renderAccountMenu(args)}</div>`,
};

export default meta;
type Story = StoryObj<AccountMenuProps>;

export const SignedOut: Story = { args: { authenticated: false, loginLabel: 'Kirjaudu Steadylla' } };

export const SignedInClosed: Story = {};

export const SignedInOpenWithDestructiveLogout: Story = { args: { open: true } };

export const WithFooterSlot: Story = {
  render: (args) =>
    `<div style="max-inline-size: 22rem; min-block-size: 22rem">${renderAccountMenu({ ...args, open: true, footer: '<small>Kehitystila: valitse rooli</small>' })}</div>`,
};
