import { SlashCommandBuilder } from 'discord.js';
import { log, warn, error } from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction) {
	try {
		await interaction.reply('Pong!');
	} catch (error) {
		error(`Failed to execute "ping" command: ${error}`);
		await interaction.reply({
			content: 'Something went wrong while executing this command.',
			ephemeral: true,
		});
	}
}
