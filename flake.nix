{
  description = "Ethan's Website Dev Flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs@{ self, nixpkgs, ... }:
  let
      forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
  in
    {
      devShell = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };

          pythonEnvironment = pkgs.python3.withPackages (ps: with ps; [
              pyyaml
          ]);
        in
        with pkgs;
        mkShell {
          name = "dev shell";
          buildInputs = [
              git
              mdcat
              nodejs
              pythonEnvironment
              pnpm
          ];
        }
      );
    };
}
