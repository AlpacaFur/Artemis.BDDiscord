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
            DataModelJsonPluginEndPoint<BDDiscordDataModel> dataModelEndPoint = _webServerService.AddDataModelJsonEndPoint(this, "betterDiscordData");
        }

        public override void Disable()
        {

        }

        public override void Update(double deltaTime)
        {
            
        }
    }
}