const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("basic-4", () => {
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.Basic4;

  it("Is runs the constructor", async () => {
    // #region code
    // Initialize the program's state struct.
    await program.state.rpc.new({
      accounts: {
        authority: provider.wallet.publicKey,
      },
    });

    // Fetch the state struct from the network.
    const state = await program.state();
    // #endregion code
    assert.ok(state.count.eq(new anchor.BN(0)));
  });

  it("Executes a method on the program", async () => {
    await program.state.rpc.increment({
      accounts: {
        authority: provider.wallet.publicKey,
      },
    });
    const state = await program.state();
    assert.ok(state.count.eq(new anchor.BN(1)));
  });
});