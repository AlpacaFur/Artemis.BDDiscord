using Artemis.BDDiscord.DataModels;
using Artemis.Core.DataModelExpansions;
using Artemis.Core.Services;

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
            JsonPluginEndPoint<BDDiscordDataModel> jsonPluginEndPoint = _webServerService.AddJsonEndPoint<BDDiscordDataModel>(this, "main", p => {
                DataModel.user = p.user;
                DataModel.guild = p.guild;
                DataModel.text = p.text;
                DataModel.voice = p.voice;
            });
        }

        public override void Disable()
        {

        }

        public override void Update(double deltaTime)
        {
            
        }
    }
}