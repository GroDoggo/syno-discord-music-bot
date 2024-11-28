import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { log, warn, error } from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('connect')
	.setDescription('Connects the bot to your current voice channel.');

export async function execute(interaction) {
	// Vérifie si l'utilisateur est dans un salon vocal
	const memberVoiceChannel = interaction.member.voice.channel;

	if (!memberVoiceChannel) {
		// Si l'utilisateur n'est pas dans un salon vocal
		await interaction.reply({
			content: 'You need to be in a voice channel to use this command!',
			ephemeral: true, // Message visible uniquement par l'utilisateur
		});
		return;
	}

	// Connecte le bot au salon vocal
	try {
		const connection = joinVoiceChannel({
			channelId: memberVoiceChannel.id,
			guildId: memberVoiceChannel.guild.id,
			adapterCreator: memberVoiceChannel.guild.voiceAdapterCreator,
		});

        log(`Connected to ${memberVoiceChannel.name}!`)
		await interaction.reply(`Connected to ${memberVoiceChannel.name}!`);
	} catch (error) {
		error(`Failed to connect: ${error}`);
		await interaction.reply({
			content: 'An error occurred while trying to connect to the voice channel.',
			ephemeral: true,
		});
	}
}
