using Artemis.BDDiscord.DataModels;
using Artemis.Core.DataModelExpansions;
using Artemis.Core.Services;
using Newtonsoft.Json;

namespace Artemis.BDDiscord
{
    public class BDDiscordModelExpansion : DataModelExpansion<BDDiscordDataModel>
    {
        private readonly IWebServerService _webServerService;

        public BDDiscordModelExpansion(IWebServerService webServerService)
        {
            _webServerService = webServerService;
        }

        public override void Enable()
        {
            DataModelJsonPluginEndPoint<BDDiscordDataModel> dataModelEndPoint = _webServerService.AddDataModelJsonEndPoint(this, "main");
            // JsonPluginEndPoint<BDDiscordDataModel> jsonPluginEndPoint = _webServerService.AddJsonEndPoint<BDDiscordDataModel>(this, "main", p => {
                //if (p.user.mentions > DataModel.user.mentions) DataModel.user.Mention.Trigger();
                //if (p.user.unread_messages > DataModel.user.unread_messages) DataModel.user.NewUnreadServer.Trigger();
                //DataModel.user = p.user;
                //DataModel.guild = p.guild;
                //DataModel.text = p.text;
                //DataModel.voice = p.voice;
            // });
        }

        public override void Disable()
        {

        }

        public override void Update(double deltaTime)
        {
            
        }
    }
}