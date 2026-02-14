import axios from 'axios';

const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK;

export const logToDiscord = async (actionType, heartsRemaining = null, additionalData = {}) => {
  try {
    // Get user IP
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const userIP = ipResponse.data.ip;

    const timestamp = new Date().toISOString();

    const embed = {
      title: `🎯 Valentine's Interaction Log`,
      color: 0xff69b4, // Pink color
      fields: [
        {
          name: '📍 User IP',
          value: `\`${userIP}\``,
          inline: true
        },
        {
          name: '🎮 Action Type',
          value: `\`${actionType}\``,
          inline: true
        },
        {
          name: '❤️ Hearts Remaining',
          value: heartsRemaining !== null ? `\`${heartsRemaining}\`` : '`N/A`',
          inline: true
        },
        {
          name: '⏰ Timestamp',
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false
        }
      ],
      footer: {
        text: 'Valentine\'s Experience Tracker',
        icon_url: 'https://i.imgur.com/6Xz4QqU.png'
      },
      thumbnail: {
        url: 'https://i.imgur.com/6Xz4QqU.png'
      }
    };

    // Add any additional data as fields
    if (Object.keys(additionalData).length > 0) {
      Object.entries(additionalData).forEach(([key, value]) => {
        embed.fields.push({
          name: `📌 ${key}`,
          value: `\`${value}\``,
          inline: true
        });
      });
    }

    await axios.post(WEBHOOK_URL, {
      embeds: [embed]
    });

    console.log('Logged to Discord successfully');
  } catch (error) {
    console.error('Failed to log to Discord:', error);
  }
};