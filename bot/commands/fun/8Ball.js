import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationIntegrationType, InteractionContextType } from 'discord.js';

export const global = true;

export const data = new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the 8Ball a question.')
    .addStringOption(option => option
        .setName('question')
        .setDescription('The question you want to ask the 8Ball.')
        .setRequired(true)
    )
    .setIntegrationTypes(
        ApplicationIntegrationType.GuildInstall,
        ApplicationIntegrationType.UserInstall
    )
    .setContexts(
        InteractionContextType.Guild,
        InteractionContextType.BotDM,
        InteractionContextType.PrivateChannel
    );

export async function execute(interaction) {
    const { options } = interaction;

    const question = options.getString('question');
    const choice = [':8ball: | It is certian.', ':8ball: | It is decidedly so.', ':8ball: | Without a doubt.', ':8ball: | Yes definitely.', ':8ball: | You may rely on it.', ':8ball: | As I see it, yes.', ':8ball: | Most likely.', ':8ball: | Outlook good.', ':8ball: | Yes.', ':8ball: | Signs point to yes.', ':8ball: | Reply hazy, try again.', ':8ball: | Ask again later.', ':8ball: | Better not tell you now.', ':8ball: | Cannot predict now.', ':8ball: | Concentrate and ask again.', ':8ball: | Don\'t count on it.', ':8ball: | My reply is no.', ':8ball: | My sources say no.', ':8ball: | Outlook not so good.', ':8ball: | Very doubtful.'];
    const ball = Math.floor(Math.random() * choice.length);

    const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`:8ball: | ${interaction.user.displayName}'s 8Ball`)
        .addFields({ name: 'Question', value: `${question}`, inline: true });

    const embed2 = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`:8ball: | ${interaction.user.displayName}'s 8Ball`)
        .addFields({ name: 'Question', value: `${question}`, inline: true })
        .addFields({ name: 'Answer', value: `${choice[ball]}`, inline: true });

    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('8ball')
                .setLabel('🎱 Roll!')
                .setStyle(ButtonStyle.Primary)
        );

    const msg = await interaction.reply({ embeds: [embed], components: [button] });

    const collector = msg.createMessageComponentCollector();

    collector.on('collect', async i => {
        if (i.customId === '8ball') {
            i.update({ embeds: [embed2], components: []});
        }
    });
}