import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { SlashCommandBuilder } from 'discord.js';
const { joinVoiceChannel } = require('@discordjs/voice');

export const data = new SlashCommandBuilder()
	.setName('connect')
	.setDescription('connect to a voice channel');
export async function execute(interaction) {

	const _channelid = interaction.member.voice.channelId;
	const _guildid = interaction.guildId;
	const _adapterCreator = interaction.guild.voiceAdapterCreator;

	if (_channelid == null) {
		await interaction.reply({ content: 'Please connect to the channel to connect before execute this command', ephemeral: true });
	}
	else {
		const connection = joinVoiceChannel({
			channelId: _channelid,
			guildId: _guildid,
			adapterCreator: _adapterCreator,
		});
		await interaction.reply({ content: 'Connected !', ephemeral: true });
	}
}