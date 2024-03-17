import { v4 as uuid } from 'uuid';
export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'grid',
		link: '/dashboard'
	},
	// {
	// 	id: uuid(),
	// 	title: 'LAYOUTS & PAGES',
	// 	grouptitle: true
	// },
	{
		id: uuid(),
		title: 'All Users',
		icon: 'users',
		link: '/all-users'
	},
	{
		id: uuid(),
		title: 'User Profiles',
		icon: 'user',
		link: '/user-profiles'
	},
	{
		id: uuid(),
		title: 'User Pictures',
		icon: 'image',
		link: '/user-pictures'
	},
	{
		id: uuid(),
		title: 'Follow Ups',
		icon: 'file-text',
		link: '/follow-ups'
	},
	{
		id: uuid(),
		title: 'Verification Codes',
		icon: 'check-circle',
		link: '/verification-codes'
	},
	{
		id: uuid(),
		title: 'Data Management',
		icon: 'database',
		children: [
			
			{ id: uuid(), link: '/castes', name: 'Castes' },
			{ id: uuid(), link: '/religion-sect', name: 'Religion & Sect' },
			{ id: uuid(), link: '/educations', name: 'Educations' },
			{
				id: uuid(),
				title: 'Payment Method',
				icon: 'database',
				children: [
					{ id: uuid(), link: '/payment-method-categories', name: 'Categories' },
					{ id: uuid(), link: '/payment-method', name: 'Payment Methods' },
				]
			},
			{
				id: uuid(),
				title: 'Promotions',
				icon: 'database',
				children: [
					{ id: uuid(), link: '/promotions-categories', name: 'Categories' },
					{ id: uuid(), link: '/promotions', name: 'Promotions' },
				]
			},
			{ id: uuid(), link: '/degrees-title', name: 'Degrees Title' },
			{ id: uuid(), link: '/professions', name: 'Professions' },
			{ id: uuid(), link: '/working-sectors', name: 'Working Sectors' },
			
		]
	},

	{
		id: uuid(),
		title: 'Packages',
		icon: 'package',
		children: [
			{ id: uuid(), link: '/packages', name: 'All Packages' },
			{ id: uuid(), link: '/package-meta', name: 'Package Meta' },
		]
	},

	{
		id: uuid(),
		title: 'Shadi.PK Branches',
		icon: 'git-branch',
		children: [
			{ id: uuid(), link: '/branches', name: 'All Branches' },
		]
	},
	{
		id: uuid(),
		title: 'Report Reasons',
		icon: 'align-center',
		children: [
			{ id: uuid(), link: '/report-reason', name: 'All Reasons' },
		]
	},
	{
		id: uuid(),
		title: 'Verify Nationalities',
		icon: 'aperture',
		link: '/user-nationalities'
	},
	{
		id: uuid(),
		title: 'User Verifications',
		icon: 'user-check',
		link: '/verification-requests'
	},
	{
		id: uuid(),
		title: 'Wallet & Transactions',
		icon: 'save',
		link: '/wallet'
	},
	{
		id: uuid(),
		title: 'Users Packages',
		icon: 'box',
		link: '/user-packages'
	},
	{
		id: uuid(),
		title: 'Connects Requests',
		icon: 'link',
		link: '/connect-requests'
	},
	{
		id: uuid(),
		title: 'Others Requests',
		icon: 'git-merge',
		link: '/other-requests'
	},
	{
		id: uuid(),
		title: 'Religion & Sect',
		icon: 'moon',
		link: '/religion'
	},
	{
		id: uuid(),
		title: 'Reported Users',
		icon: 'user-minus',
		link: '/user-reports'
	},
];

export default DashboardMenu;
