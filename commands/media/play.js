import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import path from 'node:path';
import { log, warn, error } from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Plays the audio file.');

export async function execute(interaction) {
	// Vérifie si le bot est connecté à un salon vocal
	const connection = getVoiceConnection(interaction.guild.id);
	if (!connection) {
		await interaction.reply({
			content: 'I am not connected to any voice channel! Use the `/connect` command first.',
			ephemeral: true,
		});
		return;
	}

	// Chemin du fichier audio
	const audioFilePath = path.resolve('./music/debug.mp3');

	try {
		// Crée un lecteur audio
		const player = createAudioPlayer();

		// Crée une ressource audio à partir du fichier
		const resource = createAudioResource(audioFilePath);

		// Connecte le lecteur à la connexion vocale
		connection.subscribe(player);

		// Joue le fichier audio
		player.play(resource);

		// Écoute les événements du lecteur audio
		player.on(AudioPlayerStatus.Playing, () => {
			log(`Now playing: ${audioFilePath}`);
		});

		player.on(AudioPlayerStatus.Idle, () => {
			log(`Finished playing: ${audioFilePath}`);
			player.stop();
		});

		// Répond à l'utilisateur
		await interaction.reply('Playing the audio file!');
	} catch (error) {
		error(`Failed to play audio: ${error}`);
		await interaction.reply({
			content: 'An error occurred while trying to play the audio file.',
			ephemeral: true,
		});
	}
}
