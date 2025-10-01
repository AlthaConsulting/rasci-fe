export const MfaInstruction = () => {
  return (
    <article className="prose max-w-none text-sm lg:order-1">
      <ol>
        <li>
          <p>
            <strong>Download Authenticator App:</strong>
          </p>
          <ul>
            <li>Open the App Store (iOS) or Google Play Store (Android).</li>
            <li>Search for Authenticator App and install the app.</li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Link the Authenticator App</strong>
          </p>
          <ul>
            <li>There will be a QR code on this page.</li>
            <li>
              Open the authenticator app, select &quot;Add Account,&quot; choose
              &quot;Work or School Account,&quot; and then scan the QR code this
              page.
            </li>
            <li>
              Alternatively, you can manually enter the provided secret key.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Generate and Confirm the Code</strong>
          </p>
          <ul>
            <li>The app will generate a time-based code.</li>
            <li>Click &quot;Continue&quot; button on this page</li>
            <li>
              Enter the code on the website to verify and complete the setup.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Backup Code</strong>
          </p>
          <ul>
            <li>
              Save the backup codes provided for recovery in case the app is
              inaccessible.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Finalize Setup</strong>
          </p>
          <ul>
            <li>
              Confirm the MFA activation and test it by logging out and logging
              back in using the authenticator-generated code.
            </li>
          </ul>
        </li>
      </ol>
    </article>
  );
};
