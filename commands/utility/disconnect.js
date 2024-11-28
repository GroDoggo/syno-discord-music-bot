import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { log, warn, error } from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('disconnect')
	.setDescription('Disconnects the bot from the voice channel.');

export async function execute(interaction) {
	// Vérifie si le bot est connecté à un salon vocal dans le même serveur
	const connection = getVoiceConnection(interaction.guild.id);

	if (!connection) {
		// Si le bot n'est pas connecté
		await interaction.reply({
			content: 'I am not connected to any voice channel!',
			ephemeral: true, // Message visible uniquement par l'utilisateur
		});
		return;
	}

	try {
		// Détruire la connexion
		connection.destroy();
        log('Disconnected from the voice channel!')
		await interaction.reply('Disconnected from the voice channel!');
	} catch (error) {
		error(`Failed to disconnect: ${error}`);
		await interaction.reply({
			content: 'An error occurred while trying to disconnect from the voice channel.',
			ephemeral: true,
		});
	}
}
