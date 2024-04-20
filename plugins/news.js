let {smd, send, prefix} = require("../lib")
smd(
    {
      pattern: "wabeta",
      alias: ["wab"],
      desc: "Fetches the latest WhatsApp beta information.",
      category: "news",
      filename: __filename,
      use: "wabeta",
    },
    async (message, input) => {
      try {
        const nimaWabetaInfo = require("nima-wabeta-info");
  
        nimaWabetaInfo
          .getLatest()
          .then((result) => {
            const {
              title,
              updateFor,
              date,
              image,
              subtitle,
              link,
              desc,
              QandA,
            } = result.result;
  
            let output = `*${title}*\n\n`;
            output += `*Update For:* ${updateFor.join(", ")}\n`;
            output += `*Date:* ${date}\n\n`;
            output += `*${subtitle}*\n\n`;
            output += `${desc}\n\n`;
            output += `*Image:* ${image}\n`;
            output += `*Link:* ${link}\n\n`;
  
            output += "*Q&A:*\n";
            QandA.forEach((qa) => {
              output += `\n*Q:* ${qa.question}\n*A:* ${qa.answer}\n`;
            });
  
            return message.send(output, { quoted: message });
          })
          .catch((error) => {
            console.log(error);
             message.reply("*Failed to fetch WhatsApp beta information.*");
          });
      } catch (error) {
        await message.error(error + "\n\nCommand: wabeta", error, "*Failed to fetch WhatsApp beta information.*");
      }
    }
  );
  smd(
    {
      pattern: "iosnews",
      alias: ["ios"],
      desc: "Fetches the latest iOS news.",
      category: "news",
      filename: __filename,
      use: "iosnews",
    },
    async (message, input) => {
      try {
        const { IOSNEWS } = require('ios-news');
  
        const data = await IOSNEWS();
  
        data
          .latest()
          .then((result) => {
            const { title, link, images, desc } = result.result;
  
            let output = `*${title}*\n\n`;
            output += `${desc}\n\n`;
            output += `*Link:* ${link}\n\n`;
  
            if (images && images.length > 0) {
              output += "*Images:*\n";
              images.forEach((image) => {
                output += `${image}\n`;
              });
              output += "\n";
            }
  
            return message.send(output, { quoted: message });
          })
          .catch((error) => {
            console.log(error);
            return message.reply("*Failed to fetch iOS news.*");
          });
      } catch (error) {
        await message.error(error + "\n\nCommand: iosnews", error, "*Failed to fetch iOS news.*");
      }
    }
  );
  smd(
    {
      pattern: "googlenews",
      alias: ["gnews"],
      desc: "Fetches the latest Google news.",
      category: "news",
      filename: __filename,
      use: "googlenews",
    },
    async (message, input) => {
      try {
        const { GMSNEWS } = require('gms-mobile-news');
  
        const news = await GMSNEWS();
  
        news
          .latest_news()
          .then((result) => {
            const { title, date, link, image, short_desc, full_desc } = result.result;
  
            let output = `*${title}*\n\n`;
            output += `*Date:* ${date}\n\n`;
            output += `${short_desc}\n\n`;
            output += `*Link:* ${link}\n\n`;
            output += `*Image:* ${image}\n\n`;
            output += `*Full Description:*\n${full_desc}`;
  
            return message.send(output, { quoted: message });
          })
          .catch((error) => {
            console.log(error);
            return message.reply("*Failed to fetch Google news.*");
          });
      } catch (error) {
        await message.error(error + "\n\nCommand: googlenews", error, "*Failed to fetch Google news.*");
      }
    }
  );
  