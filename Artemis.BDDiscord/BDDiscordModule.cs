using Artemis.BDDiscord.DataModels;
using Artemis.Core;
using Artemis.Core.Modules;
using Artemis.Core.Services;
using System.Collections.Generic;

namespace Artemis.BDDiscord
{
    [PluginFeature(Name = "BetterDiscord", Icon = "BDDiscord.svg")]
    public class BDDiscordModule : Module<BDDiscordDataModel>
    {
        private readonly IWebServerService _webServerService;

        public BDDiscordModule(IWebServerService webServerService)
        {
            _webServerService = webServerService;
        }

        public override List<IModuleActivationRequirement> ActivationRequirements { get; } = new()
        {
            new ProcessActivationRequirement("DiscordCanary"),
            new ProcessActivationRequirement("Discord"),
        };

        public override void Enable()
        {
            _webServerService.AddDataModelJsonEndPoint(this, "betterDiscordData");
        }

        public override void Disable()
        {

        }

        public override void Update(double deltaTime)
        {
            
        }

        public override void ModuleActivated(bool isOverride)
        {

        }

        public override void ModuleDeactivated(bool isOverride)
        {

        }
    }
}